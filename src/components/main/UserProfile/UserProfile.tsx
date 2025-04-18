import { useState, useEffect } from "react";
import { useToast } from "../../../hooks/useToast";
import { getUser } from "../../../api/users";
import { useAuth } from "../../../hooks/useAuth";
import "./UserProfile.css";

type UserProfileProps = {
  email: string;
  userName: string;
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
  const { showToast } = useToast();
  const [state, setState] = useState<UserProfileState>({
    isLoading: true,
    user: {
      email: "",
      userName: "",
      sex: "",
      birthDate: "",
      phoneNumber: "",
      avatarpath: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(auth.accessToken);

        setState({
          isLoading: false,
          user: {
            email: userData.email ?? "",
            userName: userData.userName ?? "",
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

  return (
    <div className="user-profile">
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
                        : "/images/default-avatar.svg"
                    }
                    alt="avatar"
                  />
                </div>
                <div className="user-profile-edit-button">
                  <button>Редагувати</button>
                </div>
              </div>
              <div className="user-profile-container-right">
                <div className="user-profile-info">
                  <div className="user-profile-info-text">
                    <div className="form-row">
                      <label htmlFor="email">Пошта:</label>
                      <input
                        id="email"
                        type="email"
                        value={state.user.email}
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            user: {
                              ...prev.user,
                              email: e.target.value,
                            },
                          }))
                        }
                        autoComplete="true"
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="userName">Ім'я:</label>
                      <input
                        id="userName"
                        type="text"
                        value={state.user.userName}
                        placeholder="Введіть ім'я"
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            user: {
                              ...prev.user,
                              userName: e.target.value,
                            },
                          }))
                        }
                        autoComplete="true"
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="sex">Стать:</label>
                      <select
                        id="sex"
                        value={state.user.sex}
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            user: {
                              ...prev.user,
                              sex: e.target.value,
                            },
                          }))
                        }
                      >
                        <option value="None">Не вказувати</option>
                        <option value="M">Чоловіча</option>
                        <option value="F">Жіноча</option>
                      </select>
                    </div>
                    <div className="form-row">
                      <label htmlFor="birthDate">Дата народження:</label>
                      <input
                        id="birthDate"
                        type="date"
                        value={state.user.birthDate}
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            user: {
                              ...prev.user,
                              birthDate: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="phoneNumber">Телефон:</label>
                      <input
                        id="phoneNumber"
                        type="text"
                        value={state.user.phoneNumber}
                        placeholder="Введіть телефон"
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            user: {
                              ...prev.user,
                              phoneNumber: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div>Мої волонтерські фонди</div>
                  <br />
                  <div>Мої військові угруповання</div>
                </div>
                <br />
                <button>Редагувати</button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
