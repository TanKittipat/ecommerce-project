const DashboardCard = ({ title, message, link, btn }) => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{message}</p>
          <div className="card-actions justify-center">
            <a href={link} className={`btn ${btn}`}>
              Go to {title}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
