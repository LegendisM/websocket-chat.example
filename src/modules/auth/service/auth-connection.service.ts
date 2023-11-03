import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthConnectionService {
    constructor(

    ) { }

    // TODO: create => receive auth-connection-provider and a custom payload like this {email?,username?,...} and finally call adapter to create new user, or if its exist just generate the jwt ac,ref
    // TODO: findOne => find by driver and custom identifier of that service
    // TODO: findByUser => find every user connections
    // TODO: remove => remove a connection
}