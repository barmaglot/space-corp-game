import { observable } from 'mobx';
import BusinessModel from 'App/models/business.model';
import { secondsToTime } from 'App/utils/utils';
import config from 'App/config';

class UIStore {
    @observable showManagersPopup: boolean = false;
    @observable showGreetingsPopup: boolean = false;
    @observable timeWereOut: string | null = null;
    @observable collectedSinceLastVisit: number = 0;
    @observable selectedBusinessModel: BusinessModel | null = null;

    openManagersPopup(businessModel: BusinessModel) {
        this.selectedBusinessModel = businessModel;
        this.showManagersPopup = true;
    }

    closeManagersPopup() {
        this.showManagersPopup = false;
    }

    openGreetingsPopup(idleSeconds: number, collected: number) {
        if (idleSeconds > config.POPUP_IDLE_SECONDS && collected > 0) {
            this.timeWereOut = secondsToTime(idleSeconds);
            this.collectedSinceLastVisit = collected;
            this.showGreetingsPopup = true;
        }
    }

    closeGreetingsPopup() {
        this.showGreetingsPopup = false;
    }
}

const uiStore = new UIStore();

export default uiStore;
