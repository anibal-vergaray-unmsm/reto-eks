import { Generator as SnowflakeGenerator } from 'snowflake-generator';

const Ids = new SnowflakeGenerator(1638334800000);

export const IdsRegex = /^[0-9]{8,18}$/;

export default Ids;
