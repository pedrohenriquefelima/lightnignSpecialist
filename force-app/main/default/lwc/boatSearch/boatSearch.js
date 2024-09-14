import { LightningElement } from "lwc";
import getBoats from '@salesforce/apex/BoatDataService.getBoats';

export default class BoatSearch extends LightningElement {
    isLoading = false;
    boatsData;
    error;
    
    
    // Handles loading event
    handleLoading() { }
    
    // Handles done loading event
    handleDoneLoading() { }
    
    // Handles search boat event
    // This custom event comes from the form
    async searchBoats(event) { 
      try {
        this.boatsData = await getBoats({ boatTypeId: event.detail });
        this.error = undefined;
      }catch(error) {
        this.error = error;
        this.boatsData = undefined;
      }
    }
    
    createNewBoat() { 
    }
  }