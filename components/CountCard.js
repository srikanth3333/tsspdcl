import Icon, { PieChartOutlined,ProjectFilled,ThunderboltFilled,
    SignalFilled,ReconciliationFilled,CloudFilled,
    ContainerFilled,ControlFilled,CompassFilled,
    DashboardFilled,BookFilled } from '@ant-design/icons';
import { Skeleton} from 'antd';

let icons = [
    "ProjectFilled",
    "ThunderboltFilled",
    "SignalFilled",
    "ReconciliationFilled",
    "CloudFilled",
    "ContainerFilled",
    "ControlFilled",
    "CompassFilled",
    "DashboardFilled",
    "BookFilled",
    "PieChartOutline"
]

function CountCard({data,loading}) {
    
  return (
    <>
        <div className="row mt-4">
            {
                loading ?
                data.map((item,i) => (
                    <div className="col-lg-3" key={i}>
                        <div className="card">
                            <div className="card-body">
                                <Skeleton 
                                    
                                    active 
                                    paragraph={{
                                        rows: 1,
                                    }}
                                    size="small"
                                />
                            </div>
                        </div>
                    </div>
                    
                ))
                :
                data.map((list,i) => (
                    <div className="col-lg-3" key={i}>
                        <div className={i >= 4 ? "card mt-3 shadow" : "card shadow"}>
                            <div className="card-body">
                                <div className="d-flex count-card-icon align-items-center justify-content-between">
                                    <div>
                                        <p className="count-name">{list.name}</p>
                                        <p className="count-count">{list.count}</p>
                                    </div>
                                    <PieChartOutlined className="count-icon" twoToneColor="#F7C514" />
                                    {/* <Icon component={<ProjectFilled />}  /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        
    </>
  )
}

export default CountCard