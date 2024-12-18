import { AppConfig, UserSession, showConnect } from "@stacks/connect";

export const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: "TipStack",
      icon: "https://raw.githubusercontent.com/stacksgov/stacksgov.github.io/master/img/stacks-logo.svg",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

export function getUserData() {
  return userSession.loadUserData();
}

export function signUserOut() {
  userSession.signUserOut();
  window.location.reload();
}