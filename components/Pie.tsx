import { PieChart } from 'react-native-chart-kit';

export interface PieProps {
  size: number,
  percentage: number,
  color: string,
}

export default function Pie ({ size, percentage, color }: PieProps) {
  return (
    <PieChart 
      style={{
        position: 'absolute',
        alignSelf: 'center',
      }}
      hasLegend={false}
      data={[
        {
          percentage: 100-percentage, 
          color:"transparent", 
        }, 
        {
          percentage, 
          color, 
        }]}
      backgroundColor={"transparent"}
      paddingLeft={'0'}
      accessor="percentage"
      height={size * 1.15}
      width={size * 1.15}
      center={[size * 1.15 / 4, 0]}
      absolute
      chartConfig={{
        fillShadowGradient: "red",
        fillShadowGradientTo: "blue",
      }}
  ></PieChart>
  );
}
