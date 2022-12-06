import swaggerAutogen from 'swagger-autogen';

const  outputFile =  './swagger_output.json';
//  assert{ type :"json"};
const endPointFiles =  ['./routes/index.js'];

swaggerAutogen(outputFile,endPointFiles)