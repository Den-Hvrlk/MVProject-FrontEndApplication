import { useState, useEffect, useRef } from "react";
import { useToast } from "../../../hooks/useToast";
import { getUserProfile, updateUserProfile } from "../../../api/users";
import { useAuth } from "../../../hooks/useAuth";
import "./UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  validateUserName,
  validatePhoneNumber,
  validateBirthDate,
  validateSex,
} from "../../../utils/validation";

export type UserProfileProps = {
  email: string;
  userName: string;
  hashpassword: string;
  sex: string;
  birthDate: string;
  phoneNumber: string;
  avatarpath: string;
};

type UserProfileState = {
  isLoading: boolean;
  user: UserProfileProps;
};

const UserProfile: React.FC = () => {
  console.log("UserProfile");
  const { auth } = useAuth();
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] = useState(false);
  const { showToast } = useToast();
  const userProfileRef = useRef<HTMLDivElement>(null);
  const [userDataToUpdate, setUserDataToUpdate] = useState<UserProfileProps>({
    email: "",
    userName: "",
    hashpassword: "",
    sex: "",
    birthDate: "",
    phoneNumber: "",
    avatarpath: "",
  });
  const [state, setState] = useState<UserProfileState>({
    isLoading: true,
    user: {
      email: "",
      userName: "",
      hashpassword: "",
      sex: "",
      birthDate: "",
      phoneNumber: "",
      avatarpath: "",
    },
  });

  const [validUserName, setValidUserName] = useState<boolean>(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState<boolean>(false);
  const [validSex, setValidSex] = useState<boolean>(false);
  const [validBirthDate, setValidBirthDate] = useState<boolean>(false);

  useEffect(() => {
    setValidUserName(validateUserName(userDataToUpdate.userName));
  }, [userDataToUpdate.userName]);

  useEffect(() => {
    setValidPhoneNumber(validatePhoneNumber(userDataToUpdate.phoneNumber));
  }, [userDataToUpdate.phoneNumber]);

  useEffect(() => {
    if (
      validateBirthDate(userDataToUpdate.birthDate) &&
      userDataToUpdate.birthDate <= new Date().toISOString().split("T")[0]
    ) {
      setValidBirthDate(true);
    } else {
      setValidBirthDate(false);
    }
  }, [userDataToUpdate.birthDate]);

  useEffect(() => {
    setValidSex(validateSex(userDataToUpdate.sex));
  }, [userDataToUpdate.sex]);

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setUserDataToUpdate(state.user);
  };

  useEffect(() => {
    userProfileRef.current?.scrollIntoView({ behavior: "smooth" });
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile(auth.accessToken);

        setState({
          isLoading: false,
          user: {
            email: userData.email ?? "",
            userName: userData.userName ?? "",
            hashpassword: userData.hashpassword ?? "",
            sex: userData.sex ?? "None",
            birthDate: userData.birthDate ?? "",
            phoneNumber: userData.phoneNumber ?? "",
            avatarpath: userData.avatarpath ?? "",
          },
        });
      } catch (error) {
        showToast("Не вдалося отримати дані користувача", "error");
      }
    };

    if (auth?.email && auth?.accessToken) {
      fetchUser();
    }
  }, []);

  const handleSave = async () => {
    try {
      setIsLoadingUpdateProfile(true);
      const result = await updateUserProfile(
        auth.accessToken,
        userDataToUpdate
      );
      setState({ isLoading: false, user: userDataToUpdate });
      setEditMode(false);
      showToast(result, "success");
    } catch (error) {
      showToast(error, "error");
    } finally {
      setIsLoadingUpdateProfile(false);
    }
  };

  return (
    <div className="user-profile" ref={userProfileRef}>
      <h1>ПРОФІЛЬ</h1>
      <section id="user-profile-container">
        {state.isLoading ? (
          <div className="spinner-wrapper">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="user-profile-container">
              <div className="user-profile-container-left">
                <div className="user-profile-avatar">
                  <img
                    src={
                      state.user.avatarpath &&
                      state.user.avatarpath.trim() !== ""
                        ? state.user.avatarpath
                        : "/images/default-user-avatar.svg"
                    }
                    alt="avatar"
                  />
                </div>
                <div className="user-profile-edit-button">
                  <button
                    className={editMode ? "active-edit-mode" : ""}
                    onClick={toggleEditMode}
                  >
                    {editMode
                      ? "Закрити режим редагування"
                      : "Увімкнути режим редагування"}
                  </button>
                </div>
              </div>
              <div className="user-profile-container-right">
                <div className="user-profile-info">
                  <div className="user-profile-info-text">
                    {/* Email */}
                    <div className="form-row">
                      <label htmlFor="email">Пошта:</label>
                      <div id="email" className="form-input-block">
                        <div className="readonly-field mobile-center-only">
                          {state.user.email}
                        </div>
                      </div>
                    </div>

                    {/* UserName */}
                    <div className="form-row">
                      <label htmlFor="userName">Ім'я:</label>
                      {editMode ? (
                        <div className="form-input-block">
                          <div className="form-input-without-instructions-block">
                            <input
                              id="userName"
                              type="text"
                              value={userDataToUpdate.userName}
                              placeholder="Введіть ім'я"
                              onChange={(e) =>
                                setUserDataToUpdate((prev) => ({
                                  ...prev,
                                  userName: e.target.value,
                                }))
                              }
                              autoComplete="true"
                              aria-invalid={validUserName ? "false" : "true"}
                              aria-describedby="usernamenote"
                            />
                            <div className="icon-right">
                              <FontAwesomeIcon
                                icon={validUserName ? faCheck : faTimes}
                                className={validUserName ? "valid" : "invalid"}
                              />
                            </div>
                          </div>

                          <div
                            id="usernamenote"
                            className={
                              !validUserName && userDataToUpdate.userName
                                ? "instructions"
                                : "offscreen"
                            }
                            style={{
                              textAlign: "center",
                              gap: "4px",
                              margin: "4px",
                            }}
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Ім'я користувача повинен складатися:
                            <ul style={{ textAlign: "left", gap: "4px" }}>
                              <li>Із 4 до 24 символів</li>
                              <li>Повинен починатись з букви</li>
                              <li>
                                Допускаються літери, цифри, підкреслення, дефіси
                              </li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="readonly-field">
                          {state.user.userName}
                        </div>
                      )}
                    </div>

                    {/* Стать */}
                    <div className="form-row">
                      <label htmlFor="sex">Стать:</label>
                      {editMode ? (
                        <div className="form-input-block">
                          <div className="form-input-without-instructions-block">
                            <select
                              id="sex"
                              value={userDataToUpdate.sex}
                              onChange={(e) =>
                                setUserDataToUpdate((prev) => ({
                                  ...prev,
                                  sex: e.target.value,
                                }))
                              }
                              aria-invalid={validSex ? "false" : "true"}
                              aria-describedby="sexnote"
                            >
                              <option value="None">Не вказувати</option>
                              <option value="Male">Чоловіча</option>
                              <option value="Female">Жіноча</option>
                            </select>
                            <div className="icon-right">
                              <FontAwesomeIcon
                                icon={validSex ? faCheck : faTimes}
                                className={validSex ? "valid" : "invalid"}
                              />
                            </div>
                          </div>
                          <div
                            id="sexnote"
                            className={
                              !validSex && userDataToUpdate.sex
                                ? "instructions"
                                : "offscreen"
                            }
                            style={{
                              textAlign: "center",
                              gap: "4px",
                              margin: "4px",
                            }}
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Стать повинна бути вказана:
                            <ul style={{ textAlign: "left", gap: "4px" }}>
                              <li>Чоловіча</li>
                              <li>Жіноча</li>
                              <li>Або не вказано</li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="readonly-field">
                          {
                            {
                              None: "Не вказано",
                              Male: "Чоловіча",
                              Female: "Жіноча",
                            }[state.user.sex]
                          }
                        </div>
                      )}
                    </div>

                    {/* Дата народження */}
                    <div className="form-row">
                      <label htmlFor="birthDate">Дата народження:</label>
                      {editMode ? (
                        <div className="form-input-block">
                          <div className="form-input-without-instructions-block">
                            <input
                              id="birthDate"
                              type="date"
                              value={userDataToUpdate.birthDate}
                              onChange={(e) =>
                                setUserDataToUpdate((prev) => ({
                                  ...prev,
                                  birthDate: e.target.value,
                                }))
                              }
                              aria-invalid={validBirthDate ? "false" : "true"}
                              aria-describedby="birthdatenote"
                            />
                            {userDataToUpdate.birthDate && (
                              <div className="icon-right">
                                <FontAwesomeIcon
                                  icon={validBirthDate ? faCheck : faTimes}
                                  className={
                                    validBirthDate ? "valid" : "invalid"
                                  }
                                />
                              </div>
                            )}
                          </div>
                          <div
                            id="birthdatenote"
                            className={
                              !validBirthDate && userDataToUpdate.birthDate
                                ? "instructions"
                                : "offscreen"
                            }
                            style={{
                              textAlign: "center",
                              gap: "4px",
                              margin: "4px",
                            }}
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Дата повинна:
                            <ul style={{ textAlign: "left", gap: "4px" }}>
                              <li>Мати формат РРРР-ММ-ДД</li>
                              <li>Не бути пізніше сьогоднішньої дати</li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="readonly-field">
                          {state.user.birthDate || "—"}
                        </div>
                      )}
                    </div>

                    {/* Телефон */}
                    <div className="form-row">
                      <label htmlFor="phoneNumber">Телефон:</label>
                      {editMode ? (
                        <div className="form-input-block">
                          <div className="form-input-without-instructions-block">
                            <input
                              id="phoneNumber"
                              type="text"
                              value={userDataToUpdate.phoneNumber}
                              onChange={(e) =>
                                setUserDataToUpdate((prev) => ({
                                  ...prev,
                                  phoneNumber: e.target.value,
                                }))
                              }
                              placeholder="Введіть телефон"
                              aria-invalid={validPhoneNumber ? "false" : "true"}
                              aria-describedby="phonenumbernote"
                            />
                            {userDataToUpdate.phoneNumber && (
                              <div className="icon-right">
                                <FontAwesomeIcon
                                  icon={validPhoneNumber ? faCheck : faTimes}
                                  className={
                                    validPhoneNumber ? "valid" : "invalid"
                                  }
                                />
                              </div>
                            )}
                          </div>
                          <div
                            id="phonenumbernote"
                            className={
                              !validPhoneNumber && userDataToUpdate.phoneNumber
                                ? "instructions"
                                : "offscreen"
                            }
                            style={{
                              textAlign: "center",
                              gap: "4px",
                              margin: "4px",
                            }}
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Номер телефону повинен мати формат +380XXXXXXXXX:
                          </div>
                        </div>
                      ) : (
                        <div className="readonly-field">
                          {state.user.phoneNumber || "—"}
                        </div>
                      )}
                    </div>
                  </div>

                  <br />
                  <br />

                  <div>Мої волонтерські фонди</div>
                  <div>—</div>
                  <br />
                  <div>Мої військові угруповання</div>
                  <div>—</div>

                  {editMode && (
                    <>
                      <div className="button-wrapper">
                        <button
                          className="edit-button"
                          onClick={handleSave}
                          disabled={isLoadingUpdateProfile}
                        >
                          Редагувати
                        </button>
                      </div>
                      {isLoadingUpdateProfile && (
                        <div className="spinner-wrapper-update-profile">
                          <div className="spinner"></div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
