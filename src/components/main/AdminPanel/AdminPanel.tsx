import { useState, useEffect, useRef } from "react";
import {
  getRegistrationFundRequests,
  resolveRequest,
  rejectRequest,
} from "../../../api/funds";
import { useAuth } from "../../../hooks/useAuth";
import "./AdminPanel.css";
import { useToast } from "../../../hooks/useToast";

const AdminPanel: React.FC = () => {
  console.log("AdminPanel");
  const panelRef = useRef<HTMLDivElement>(null);
  const { auth } = useAuth();
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  interface Notification {
    id_key: string;
    id_reference: string;
    message: string;
    date: string;
    fullData: any;
  }

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const data = await getRegistrationFundRequests(auth.accessToken);
        if (typeof data !== "string") {
          console.log("От сервера получено сообщение:", data);
          const processedData: Notification[] = data.map(
            (item: any): Notification => {
              const fundName = item.fundName;
              const userName = item.userName ?? "—";

              return {
                id_key: item.iD_RegisterFundRequest,
                id_reference: item.iD_User,
                date: item.registerFundRequestDate,
                message: `Фонд: ${fundName}, Користувач: ${userName}`,
                fullData: item,
              };
            }
          );

          setNotifications(processedData);
        } else {
          console.log("От сервера получено сообщение:", data);
        }
      } catch (err: any) {
        console.error("Помилка отримання запитів:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleResolveRequest = async (id: string) => {
    try {
      const response = await resolveRequest(auth.accessToken, id);
      setNotifications((prev) => prev.filter((n) => n.id_key !== id));
      showToast(response, "success");
    } catch (error) {
      showToast(error, "error");
    }
  };

  const handleRejectRequest = async (id: string) => {
    try {
      const response = await rejectRequest(auth.accessToken, id);
      setNotifications((prev) => prev.filter((n) => n.id_key !== id));
      showToast(response, "success");
    } catch (error) {
      showToast(error, "error");
    }
  };

  return (
    <>
      <section className="admin-panel" ref={panelRef}>
        <h1>Admin Panel</h1>
        <div className="admin-panel-content">
          <table>
            <thead>
              <tr className="notification-head-row">
                <th>ID_Key</th>
                <th>ID_Reference</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            {notifications.length === 0 && !isLoading ? (
              <tbody></tbody>
            ) : (
              <tbody>
                {notifications.map((notification) => (
                  <tr className="notification-row" key={notification.id_key}>
                    <td>{notification.id_key}</td>
                    <td>{notification.id_reference}</td>
                    <td>
                      {notification.message}
                      <button
                        className="open-details-btn"
                        onClick={() =>
                          setSelectedRequest(notification.fullData)
                        }
                      >
                        Деталі
                      </button>
                    </td>
                    <td>{notification.date}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleResolveRequest(notification.id_key)
                        }
                      >
                        ✔️ Прийняти
                      </button>
                      <button
                        onClick={() => handleRejectRequest(notification.id_key)}
                      >
                        ❌ Відхилити
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {isLoading ? (
            <div className="spinner-wrapper">
              <div className="spinner"></div>
            </div>
          ) : (
            notifications.length === 0 && (
              <div className="no-data-message">
                Запити на реєстрацію фонду не знайдені.
              </div>
            )
          )}
        </div>
      </section>

      {/* 👇 Модальное окно — здесь */}
      {selectedRequest && (
        <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Деталі запиту</h2>
            <div className="modal-fields">
              {Object.entries(selectedRequest).map(([key, value]) => (
                <div key={key} className="modal-field">
                  <strong>{key}:</strong> {JSON.stringify(value)}
                </div>
              ))}
            </div>
            <button
              className="modal-close-button"
              onClick={() => setSelectedRequest(null)}
            >
              Закрити
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
