import { Mesh } from "../structures/Mesh.js";
import { Triangle } from "../structures/Triangle.js";
import { Vec3d } from "../structures/Vec3d.js";

const vectors = [
  0,
  new Vec3d(-11.748, -0.36, 1.268),
  new Vec3d(-11.276, -0.36, 1.268),
  new Vec3d(-10.424, -0.36, 0.228),
  new Vec3d(-9.568, -0.36, 1.268),
  new Vec3d(-9.092, -0.36, 1.268),
  new Vec3d(-10.184, -0.36, -0.048),
  new Vec3d(-9.008, -0.36, -1.46),
  new Vec3d(-9.484, -0.36, -1.46),
  new Vec3d(-10.424, -0.36, -0.332),
  new Vec3d(-11.352, -0.36, -1.46),
  new Vec3d(-11.824, -0.36, -1.46),
  new Vec3d(-10.66, -0.36, -0.048),
  new Vec3d(-9.484, 0.373033, -1.46),
  new Vec3d(-10.424, 0.373033, -0.332),
  new Vec3d(-11.748, 0.373033, 1.268),
  new Vec3d(-10.66, 0.373033, -0.048),
  new Vec3d(-9.568, 0.373033, 1.268),
  new Vec3d(-10.184, 0.373033, -0.048),
  new Vec3d(-11.824, 0.373033, -1.46),
  new Vec3d(-9.008, 0.373033, -1.46),
  new Vec3d(-10.424, 0.373033, 0.228),
  new Vec3d(-11.352, 0.373033, -1.46),
  new Vec3d(-9.092, 0.373033, 1.268),
  new Vec3d(-11.276, 0.373033, 1.268),
  new Vec3d(-0.62, -0.38, 11.376),
  new Vec3d(1.116, -0.38, 9.0),
  new Vec3d(-1.344, -0.38, 9.0),
  new Vec3d(-1.344, -0.38, 9.352),
  new Vec3d(0.392, -0.38, 9.352),
  new Vec3d(-1.344, -0.38, 11.728),
  new Vec3d(1.008, -0.38, 11.728),
  new Vec3d(1.008, -0.38, 11.376),
  new Vec3d(0.392, 0.384923, 9.352),
  new Vec3d(-1.344, 0.384923, 11.728),
  new Vec3d(-0.62, 0.384923, 11.376),
  new Vec3d(-1.344, 0.384923, 9.352),
  new Vec3d(1.116, 0.384923, 9.0),
  new Vec3d(1.008, 0.384923, 11.728),
  new Vec3d(1.008, 0.384923, 11.376),
  new Vec3d(-1.344, 0.384923, 9.0),
  new Vec3d(-0.25, 10.788, 0.104),
  new Vec3d(-0.25, 11.728, -0.628),
  new Vec3d(-0.25, 11.728, -1.1),
  new Vec3d(-0.25, 10.444, -0.088),
  new Vec3d(-0.25, 9.0, -0.088),
  new Vec3d(-0.25, 9.0, 0.304),
  new Vec3d(-0.25, 10.44, 0.304),
  new Vec3d(-0.25, 11.728, 1.316),
  new Vec3d(-0.25, 11.728, 0.844),
  new Vec3d(0.304321, 9.0, -0.088),
  new Vec3d(0.304321, 9.0, 0.304),
  new Vec3d(0.304321, 10.44, 0.304),
  new Vec3d(0.304321, 10.444, -0.088),
  new Vec3d(0.304321, 11.728, 1.316),
  new Vec3d(0.304321, 10.788, 0.104),
  new Vec3d(0.304321, 11.728, -0.628),
  new Vec3d(0.304321, 11.728, -1.1),
  new Vec3d(0.304321, 11.728, 0.844),
  new Vec3d(0.5, -0.5, -0.5),
  new Vec3d(0.5, 0.5, -0.5),
  new Vec3d(0.5, -0.5, 0.5),
  new Vec3d(0.5, 0.5, 0.5),
  new Vec3d(-0.5, -0.5, -0.5),
  new Vec3d(-0.5, 0.5, -0.5),
  new Vec3d(-0.5, -0.5, 0.5),
  new Vec3d(-0.5, 0.5, 0.5),
  new Vec3d(-8.5, 0.5, 0.5),
  new Vec3d(-8.5, -0.5, 0.5),
  new Vec3d(-8.5, -0.5, -0.5),
  new Vec3d(-8.5, 0.5, -0.5),
  new Vec3d(0.5, 8.5, -0.5),
  new Vec3d(0.5, 8.5, 0.5),
  new Vec3d(-0.5, 8.5, 0.5),
  new Vec3d(-0.5, 8.5, -0.5),
  new Vec3d(0.5, 0.5, 8.5),
  new Vec3d(0.5, -0.5, 8.5),
  new Vec3d(-0.5, -0.5, 8.5),
  new Vec3d(-0.5, 0.5, 8.5),
];

export const axis = new Mesh([
  new Triangle(vectors[6], vectors[5], vectors[4]),
  new Triangle(vectors[6], vectors[4], vectors[3]),
  new Triangle(vectors[3], vectors[2], vectors[1]),
  new Triangle(vectors[3], vectors[1], vectors[12]),
  new Triangle(vectors[6], vectors[3], vectors[12]),
  new Triangle(vectors[7], vectors[6], vectors[12]),
  new Triangle(vectors[7], vectors[12], vectors[9]),
  new Triangle(vectors[9], vectors[12], vectors[11]),
  new Triangle(vectors[7], vectors[9], vectors[8]),
  new Triangle(vectors[10], vectors[9], vectors[11]),
  new Triangle(vectors[18], vectors[17], vectors[23]),
  new Triangle(vectors[18], vectors[21], vectors[17]),
  new Triangle(vectors[21], vectors[15], vectors[24]),
  new Triangle(vectors[21], vectors[16], vectors[15]),
  new Triangle(vectors[18], vectors[16], vectors[21]),
  new Triangle(vectors[20], vectors[16], vectors[18]),
  new Triangle(vectors[20], vectors[14], vectors[16]),
  new Triangle(vectors[14], vectors[19], vectors[16]),
  new Triangle(vectors[20], vectors[13], vectors[14]),
  new Triangle(vectors[22], vectors[19], vectors[14]),
  new Triangle(vectors[6], vectors[23], vectors[5]),
  new Triangle(vectors[9], vectors[13], vectors[8]),
  new Triangle(vectors[10], vectors[14], vectors[9]),
  new Triangle(vectors[7], vectors[18], vectors[6]),
  new Triangle(vectors[1], vectors[16], vectors[12]),
  new Triangle(vectors[11], vectors[22], vectors[10]),
  new Triangle(vectors[2], vectors[15], vectors[1]),
  new Triangle(vectors[5], vectors[17], vectors[4]),
  new Triangle(vectors[4], vectors[21], vectors[3]),
  new Triangle(vectors[3], vectors[24], vectors[2]),
  new Triangle(vectors[8], vectors[20], vectors[7]),
  new Triangle(vectors[12], vectors[19], vectors[11]),
  new Triangle(vectors[32], vectors[31], vectors[30]),
  new Triangle(vectors[32], vectors[30], vectors[25]),
  new Triangle(vectors[25], vectors[30], vectors[29]),
  new Triangle(vectors[26], vectors[25], vectors[29]),
  new Triangle(vectors[26], vectors[29], vectors[28]),
  new Triangle(vectors[26], vectors[28], vectors[27]),
  new Triangle(vectors[39], vectors[34], vectors[38]),
  new Triangle(vectors[39], vectors[35], vectors[34]),
  new Triangle(vectors[35], vectors[33], vectors[34]),
  new Triangle(vectors[37], vectors[33], vectors[35]),
  new Triangle(vectors[37], vectors[36], vectors[33]),
  new Triangle(vectors[37], vectors[40], vectors[36]),
  new Triangle(vectors[28], vectors[40], vectors[27]),
  new Triangle(vectors[25], vectors[39], vectors[32]),
  new Triangle(vectors[32], vectors[38], vectors[31]),
  new Triangle(vectors[26], vectors[35], vectors[25]),
  new Triangle(vectors[29], vectors[36], vectors[28]),
  new Triangle(vectors[30], vectors[33], vectors[29]),
  new Triangle(vectors[27], vectors[37], vectors[26]),
  new Triangle(vectors[31], vectors[34], vectors[30]),
  new Triangle(vectors[44], vectors[42], vectors[43]),
  new Triangle(vectors[44], vectors[41], vectors[42]),
  new Triangle(vectors[41], vectors[48], vectors[49]),
  new Triangle(vectors[41], vectors[47], vectors[48]),
  new Triangle(vectors[44], vectors[47], vectors[41]),
  new Triangle(vectors[45], vectors[47], vectors[44]),
  new Triangle(vectors[45], vectors[46], vectors[47]),
  new Triangle(vectors[53], vectors[57], vectors[56]),
  new Triangle(vectors[53], vectors[56], vectors[55]),
  new Triangle(vectors[55], vectors[58], vectors[54]),
  new Triangle(vectors[55], vectors[54], vectors[52]),
  new Triangle(vectors[53], vectors[55], vectors[52]),
  new Triangle(vectors[50], vectors[53], vectors[52]),
  new Triangle(vectors[50], vectors[52], vectors[51]),
  new Triangle(vectors[58], vectors[41], vectors[49]),
  new Triangle(vectors[50], vectors[46], vectors[45]),
  new Triangle(vectors[55], vectors[42], vectors[41]),
  new Triangle(vectors[54], vectors[49], vectors[48]),
  new Triangle(vectors[51], vectors[47], vectors[46]),
  new Triangle(vectors[52], vectors[48], vectors[47]),
  new Triangle(vectors[56], vectors[43], vectors[42]),
  new Triangle(vectors[57], vectors[44], vectors[43]),
  new Triangle(vectors[53], vectors[45], vectors[44]),
  new Triangle(vectors[60], vectors[61], vectors[59]),
  new Triangle(vectors[65], vectors[78], vectors[66]),
  new Triangle(vectors[66], vectors[68], vectors[65]),
  new Triangle(vectors[64], vectors[59], vectors[63]),
  new Triangle(vectors[65], vectors[59], vectors[61]),
  new Triangle(vectors[60], vectors[72], vectors[62]),
  new Triangle(vectors[67], vectors[69], vectors[68]),
  new Triangle(vectors[63], vectors[70], vectors[64]),
  new Triangle(vectors[65], vectors[69], vectors[63]),
  new Triangle(vectors[64], vectors[67], vectors[66]),
  new Triangle(vectors[72], vectors[74], vectors[73]),
  new Triangle(vectors[64], vectors[71], vectors[60]),
  new Triangle(vectors[62], vectors[73], vectors[66]),
  new Triangle(vectors[66], vectors[74], vectors[64]),
  new Triangle(vectors[75], vectors[77], vectors[76]),
  new Triangle(vectors[61], vectors[77], vectors[65]),
  new Triangle(vectors[66], vectors[75], vectors[62]),
  new Triangle(vectors[62], vectors[76], vectors[61]),
  new Triangle(vectors[6], vectors[18], vectors[23]),
  new Triangle(vectors[9], vectors[14], vectors[13]),
  new Triangle(vectors[10], vectors[22], vectors[14]),
  new Triangle(vectors[7], vectors[20], vectors[18]),
  new Triangle(vectors[1], vectors[15], vectors[16]),
  new Triangle(vectors[11], vectors[19], vectors[22]),
  new Triangle(vectors[2], vectors[24], vectors[15]),
  new Triangle(vectors[5], vectors[23], vectors[17]),
  new Triangle(vectors[4], vectors[17], vectors[21]),
  new Triangle(vectors[3], vectors[21], vectors[24]),
  new Triangle(vectors[8], vectors[13], vectors[20]),
  new Triangle(vectors[12], vectors[16], vectors[19]),
  new Triangle(vectors[28], vectors[36], vectors[40]),
  new Triangle(vectors[25], vectors[35], vectors[39]),
  new Triangle(vectors[32], vectors[39], vectors[38]),
  new Triangle(vectors[26], vectors[37], vectors[35]),
  new Triangle(vectors[29], vectors[33], vectors[36]),
  new Triangle(vectors[30], vectors[34], vectors[33]),
  new Triangle(vectors[27], vectors[40], vectors[37]),
  new Triangle(vectors[31], vectors[38], vectors[34]),
  new Triangle(vectors[58], vectors[55], vectors[41]),
  new Triangle(vectors[50], vectors[51], vectors[46]),
  new Triangle(vectors[55], vectors[56], vectors[42]),
  new Triangle(vectors[54], vectors[58], vectors[49]),
  new Triangle(vectors[51], vectors[52], vectors[47]),
  new Triangle(vectors[52], vectors[54], vectors[48]),
  new Triangle(vectors[56], vectors[57], vectors[43]),
  new Triangle(vectors[57], vectors[53], vectors[44]),
  new Triangle(vectors[53], vectors[50], vectors[45]),
  new Triangle(vectors[60], vectors[62], vectors[61]),
  new Triangle(vectors[65], vectors[77], vectors[78]),
  new Triangle(vectors[66], vectors[67], vectors[68]),
  new Triangle(vectors[64], vectors[60], vectors[59]),
  new Triangle(vectors[65], vectors[63], vectors[59]),
  new Triangle(vectors[60], vectors[71], vectors[72]),
  new Triangle(vectors[67], vectors[70], vectors[69]),
  new Triangle(vectors[63], vectors[69], vectors[70]),
  new Triangle(vectors[65], vectors[68], vectors[69]),
  new Triangle(vectors[64], vectors[70], vectors[67]),
  new Triangle(vectors[72], vectors[71], vectors[74]),
  new Triangle(vectors[64], vectors[74], vectors[71]),
  new Triangle(vectors[62], vectors[72], vectors[73]),
  new Triangle(vectors[66], vectors[73], vectors[74]),
  new Triangle(vectors[75], vectors[78], vectors[77]),
  new Triangle(vectors[61], vectors[76], vectors[77]),
  new Triangle(vectors[66], vectors[78], vectors[75]),
  new Triangle(vectors[62], vectors[75], vectors[76]),
]);
