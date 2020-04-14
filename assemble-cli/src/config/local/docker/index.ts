

import * as elasticsearch from "./elasticsearch";
import * as mysql from "./mysql";


export interface LocalDockerConfig{

    elasticsearch?: elasticsearch.LocalDockerElasticSearchConfig;

    mysql?: mysql.LocalDockerMySQLConfig;

}


export class NewsTeamLocalDockerConfig{

    elasticsearch: elasticsearch.NewsTeamLocalDockerElasticSearchConfig;

    mysql: mysql.NewsTeamLocalDockerMySQLConfig;

    constructor(config?: LocalDockerConfig){

        this.elasticsearch = new elasticsearch.NewsTeamLocalDockerElasticSearchConfig(config?.elasticsearch);

        this.mysql = new mysql.NewsTeamLocalDockerMySQLConfig(config?.mysql);

    }

}
