import { QueryTypes } from "sequelize";

const selectFormat = (input: any, model: any) => {
  return {
    replacements: input,
    model: model,
    type: QueryTypes.SELECT,
  };
};

export { selectFormat };
