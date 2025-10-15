// routes/dashboardRoutes.js
import { handleDashboard } from "../controllers/dashboardController.js";

export const handleDashboardRoutes = async (req, res) => {
  if (req.url.startsWith("/dashboard")) {
    return handleDashboard(req, res);
  }

  return false;
};
