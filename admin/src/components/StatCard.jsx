const StatCard = ({ icon, label, value, color }) => {
    return (
      <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-xl shadow-lg flex flex-col justify-between`}>
        <div className="flex items-center justify-between">
          <div className="text-3xl">{icon}</div>
          <button className="bg-white text-sm text-gray-700 px-3 py-1 rounded-full shadow">View All</button>
        </div>
        <div className="mt-6">
          <p className="text-lg font-semibold">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    );
  };
  
  export default StatCard;
  