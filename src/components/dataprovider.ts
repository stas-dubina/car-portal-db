import simpleRestProvider from "ra-data-simple-rest";
import {CreateParams, DataProvider} from "ra-core";
import {fetchUtils} from "react-admin";
import {getToken} from "@/components/authprovider";

const endpoint = "http://localhost:3000/api";

const httpClient = (url: any, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const token = getToken();
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
}
const baseDataProvider = simpleRestProvider(endpoint, httpClient);


const createPostFormData = (
    params: CreateParams<any>
) => {
    const formData = new FormData();
    params.data.image?.rawFile && formData.append("file", params.data.image.rawFile);

    return formData;
};

export const dataProvider: DataProvider = {
    ...baseDataProvider,
    create: (resource, params) => {
        if (resource.startsWith("cars") && resource.endsWith("/images")) {
            const formData = createPostFormData(params);
            return fetchUtils
                .fetchJson(`${endpoint}/${resource}`, {
                    method: "POST",
                    body: formData,
                })
                .then(({json}) => ({data: json}));
        }
        return baseDataProvider.create(resource, params);
    }
};