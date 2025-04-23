import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import "./Reports.css";

interface FundReport {
  iD_FundReport: string;
  fundName: string;
  completedRequestsCount: number;
  completedFundraisingCount: number;
  totalGoals: number;
  totalRaised: number;
  period: string;
  id_Fund: string;
}

interface GroupReport {
  iD_GroupReport: string;
  groupName: string;
  fundraisingCount: number;
  closedFundraisingCount: number;
  goalToBeRecieved: number;
  fundsReceived: number;
  allRequestCount: number;
  completedRequestCount: number;
  incompleteRequestCount: number;
  period: string;
  id_Group: string;
}

interface ReportsResponse {
  fundReports: FundReport[];
  groupReports: GroupReport[];
}

const Reports: React.FC = () => {
  console.log("Reports");
  const [reports, setReports] = useState<ReportsResponse>({
    fundReports: [],
    groupReports: [],
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get<ReportsResponse>("/reports");
        setReports(response.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="reports-page">
      <h1>Звіти</h1>

      <section className="reports-section" id="fund-reports">
        <h2>Звіти фондів</h2>
        {reports.fundReports.length === 0 ? (
          <p>Немає звітів фондів.</p>
        ) : (
          <div className="reports-list">
            {reports.fundReports.map((report) => (
              <div key={report.iD_FundReport} className="report-card">
                <h3>{report.fundName}</h3>
                <p>Період: {new Date(report.period).toLocaleDateString()}</p>
                <p>Виконані запити: {report.completedRequestsCount}</p>
                <p>Закриті збори: {report.completedFundraisingCount}</p>
                <p>Мета зборів: {report.totalGoals} грн</p>
                <p>Отримано коштів: {report.totalRaised} грн</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="reports-section" id="group-reports">
        <h2>Звіти військових груп</h2>
        {reports.groupReports.length === 0 ? (
          <p>Немає звітів груп.</p>
        ) : (
          <div className="reports-list">
            {reports.groupReports.map((report) => (
              <div key={report.iD_GroupReport} className="report-card">
                <h3>{report.groupName}</h3>
                <p>Період: {new Date(report.period).toLocaleDateString()}</p>
                <p>Усього зборів: {report.fundraisingCount}</p>
                <p>Закрито зборів: {report.closedFundraisingCount}</p>
                <p>Цілі зборів: {report.goalToBeRecieved} грн</p>
                <p>Отримано коштів: {report.fundsReceived} грн</p>
                <p>Усього запитів: {report.allRequestCount}</p>
                <p>Виконано: {report.completedRequestCount}</p>
                <p>Не виконано: {report.incompleteRequestCount}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Reports;
