import { useState } from "react";
import AdminLayout from "../components/AdminLayout";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Anjana",
    email: "anjana@example.com",
    password: "",
  });

  const [appSettings, setAppSettings] = useState({
    productAvailability: true,
    maintenanceMode: false,
    currency: "INR",
    tax: 5,
  });

  const [notifications, setNotifications] = useState({
    newOrders: true,
    customerQueries: true,
    lowStock: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: 30,
    allowedIPs: "",
  });

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
    
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>

      {/* Admin Profile Settings */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Admin Profile</h3>
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="block mb-2 border px-3 py-1 rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="block mb-2 border px-3 py-1 rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={profile.password}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          className="block mb-2 border px-3 py-1 rounded w-full"
        />
        <input
          type="file"
          className="block mb-2 border px-3 py-1 rounded w-full"
        />
      </div>

      {/* Application Settings */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Application Settings</h3>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={appSettings.productAvailability}
            onChange={() => setAppSettings({
              ...appSettings,
              productAvailability: !appSettings.productAvailability,
            })}
            className="mr-2"
          />
          Product Availability
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={appSettings.maintenanceMode}
            onChange={() => setAppSettings({
              ...appSettings,
              maintenanceMode: !appSettings.maintenanceMode,
            })}
            className="mr-2"
          />
          Maintenance Mode
        </label>
        <select
          value={appSettings.currency}
          onChange={(e) => setAppSettings({ ...appSettings, currency: e.target.value })}
          className="block mb-2 border px-3 py-1 rounded w-full"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
        <input
          type="number"
          value={appSettings.tax}
          onChange={(e) => setAppSettings({ ...appSettings, tax: Number(e.target.value) })}
          placeholder="Tax %"
          className="block mb-2 border px-3 py-1 rounded w-full"
        />
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Notification Settings</h3>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={notifications.newOrders}
            onChange={() => setNotifications({
              ...notifications,
              newOrders: !notifications.newOrders,
            })}
            className="mr-2"
          />
          New Order Notifications
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={notifications.customerQueries}
            onChange={() => setNotifications({
              ...notifications,
              customerQueries: !notifications.customerQueries,
            })}
            className="mr-2"
          />
          Customer Queries Notifications
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={notifications.lowStock}
            onChange={() => setNotifications({
              ...notifications,
              lowStock: !notifications.lowStock,
            })}
            className="mr-2"
          />
          Low Stock Alerts
        </label>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Security Settings</h3>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={security.twoFactor}
            onChange={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
            className="mr-2"
          />
          Enable Two-Factor Authentication
        </label>
        <input
          type="number"
          value={security.sessionTimeout}
          onChange={(e) => setSecurity({ ...security, sessionTimeout: Number(e.target.value) })}
          placeholder="Session Timeout (min)"
          className="block mb-2 border px-3 py-1 rounded w-full"
        />
        <input
          type="text"
          value={security.allowedIPs}
          onChange={(e) => setSecurity({ ...security, allowedIPs: e.target.value })}
          placeholder="Allowed IPs (comma separated)"
          className="block mb-2 border px-3 py-1 rounded w-full"
        />
      </div>

      {/* Backup and Restore */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Backup & Restore</h3>
        <button className="bg-green-500 text-white px-4 py-2 rounded mr-4 hover:bg-green-600">
          Backup Now
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Restore Backup
        </button>
      </div>

      <div className="text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save All Changes
        </button>
      </div>
    </div>
    </AdminLayout>
  );
};

export default Settings;
