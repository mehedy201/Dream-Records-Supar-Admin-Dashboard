function LoadingScreen() {
  return (
    <div className="page-loader">
      <div className="skeleton skeleton-banner"></div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton skeleton-img"></div>
          <div className="skeleton skeleton-lines">
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingScreen;
