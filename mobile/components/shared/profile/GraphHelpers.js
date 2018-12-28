import { scaleLinear, scaleTime } from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

export const linearScale = scaleLinear()
  .domain(dArr)
  .range(rArr);
export const timeScale = scaleTime()
  .domain(dDate)
  .range(rDate);
