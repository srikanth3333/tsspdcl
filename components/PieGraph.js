import React from 'react';

import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
} from 'devextreme-react/pie-chart';
import { useRouter } from 'next/router'

const resolveModes = ['shift', 'hide', 'none'];

const PieGraph = ({data,link}) => {

    const router = useRouter()
    
    function customizeText(arg) {
      
        return `${arg.argument} (${arg.percentText})`;
        // return `${arg.argument}`;
    }

    const onPointClick = ({ target: point }) => {
        point.select();
        
        router.push(`${link}/${point.data.analysisRemark}`);        
      }
  
    return (
      <PieChart
        id="pie"
        dataSource={data}
        palette="Bright"
        title="Analysis Remark"
        type="doughnut"
        // onPointClick={pointClickHandler}
        // onLegendClick={legendClickHandler}
        onPointClick={onPointClick}
        resolveLabelOverlapping={resolveModes[0]}
      >
        <Series
          argumentField="analysisRemark"
          valueField="val"
        >
          <Label visible={true} customizeText={customizeText}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>

        <Size width={'100%'} height={500} />
        {/* <Export enabled={true} /> */}
      </PieChart>
    );
}

export default PieGraph;
