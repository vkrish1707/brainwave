<div className="dashboard-grid">
  <div className="card card-full">
    {inProgress ? <Skeleton variant="rectangular" height={300} animation="wave" /> : (
      <ReqStatusBarChart barChartData={barChartData} />
    )}
  </div>

  <div className="card card-half">
    {inProgress ? <Skeleton variant="rectangular" height={300} animation="wave" /> : (
      <ActivelyRecruitingPieChart pieData={pieChartData} />
    )}
  </div>

  <div className="card card-half">
    {inProgress ? <Skeleton variant="rectangular" height={300} animation="wave" /> : (
      <RecruitingDonutChart donutData={donutData} />
    )}
  </div>
</div>