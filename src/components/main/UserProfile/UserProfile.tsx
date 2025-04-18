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

const UserProfile: React.FC = () => {
  console.log("UserProfile");
  const { auth } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfileProps>({
    email: "",
    userName: "",
    sex: "None",
    birthDate: "",
    phoneNumber: "",
    avatarpath: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser(auth.accessToken);
        setUser(userData);
      } catch (error) {
        showToast("Не вдалося отримати дані користувача", "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (auth?.email && auth?.accessToken) {
      fetchUser();
    }
  }, []);

  return (
    <div className="user-profile">
      <h1>Профіль</h1>
      <section id="user-profile-container">
        {isLoading ? (
          <div className="spinner-wrapper">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="user-profile-container">
              <div className="user-profile-container-left">
                <div className="user-profile-avatar">
                  <img src={user.avatarpath} alt="avatar" />
                </div>
                <div className="user-profile-edit-button">
                  <button>Редагувати</button>
                </div>
              </div>
              <div className="user-profile-container-right">
                <div className="user-profile-info">
                  <p>Пошта: {user.email}</p>
                  <p>Ім'я: {user.userName}</p>
                  <p>Стать: {user.sex}</p>
                  <p>Дата народження: {user.birthDate}</p>
                  <p>Телефон: {user.phoneNumber}</p>
                  <br />
                  <div>Мої волонтерські фонди</div>
                  <br />
                  <div>Мої військові угруповання</div>
                  <br />
                  <br />
                  <button>Редагувати</button>
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
