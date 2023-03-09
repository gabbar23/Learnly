import { Sequelize } from "sequelize";
import PropertiesReader from "properties-reader";
import { dirPath } from "./path";

const properties = PropertiesReader(
  dirPath.join(__dirname, "../../dbconfig/properties.ini")
);

const sequelize = new Sequelize(
  `${properties.get("dev.db")}`,
  `${properties.get("dev.username")}`,
  `${properties.get("dev.password")}`,
  {
    dialect: "mysql",
    host: `${properties.get("dev.host")}`,
  }
);

export { sequelize };
