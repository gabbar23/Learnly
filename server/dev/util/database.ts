import { Sequelize } from "sequelize";
import PropertiesReader from "properties-reader";
import { dirPath } from "./path";

const properties = PropertiesReader(
  dirPath.join(__dirname, "../", "../", "config/keys.properties")
);

//creating Database Connection
const sequelize = new Sequelize(
  "bid_test",
  "root",
  `${properties.get("DBPASSWORD")}`,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

export { sequelize };
