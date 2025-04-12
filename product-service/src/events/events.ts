import {userCreatedListener} from "./userCreated.listener";

export default function registered_events() {
    userCreatedListener();
    // Add other event listeners here
    // e.g., orderCreatedListener(), productUpdatedListener(), etc.
}