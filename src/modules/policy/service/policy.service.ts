import { Injectable } from "@nestjs/common";
import { PolicyFactory } from "../policy.factory";

@Injectable()
export class PolicyService {
    constructor(
        private policyFactory: PolicyFactory,
    ) { }
}