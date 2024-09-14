import { LightningElement } from "lwc";

export default class BoatSearch extends LightningElement {
    isLoading = false;
    boatsData;
    error;
    boatTypeId;
    
    
    // Handles loading event
    handleLoading() { }
    
    // Handles done loading event
    handleDoneLoading() { }
    
    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) { 
      console.log('event.detail', event.detail);
      this.boatTypeId = event.detail;
    }
    
    createNewBoat() { 
    }
  }