import { HttpMethod } from "config/httpMethods";
import { ModelNamesEnum } from "config/models";
import request from "config/request";

export async function deleteUserAction(id: number) {
    return request({
        path: `/${ModelNamesEnum.User}/${id}`,
        method: HttpMethod.DELETE,
    });
}

export async function insertUserAction(email: string, firstName: string, lastName: string) {
    return request({
        path: `/${ModelNamesEnum.User}/new`,
        method: HttpMethod.PUT,
        body: {
            email: email,
            first_name: firstName,
            last_name: lastName,
        },
    });
}

export function isValidEmail(text: string) {
    return text.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
