import { LightningElement, wire, api } from 'lwc';
import getSimilarBoats from '@salesforce/apex/BoatDataService.getSimilarBoats';
import { NavigationMixin } from "lightning/navigation";
const BOAT_OBJECT = 'Boat__c';

export default class SimilarBoats extends NavigationMixin(LightningElement) {
    // Private
    relatedBoats;
    boatId;
    error;
    
    @api
    get recordId() {
        return this.boatId;
    }

    set recordId(value) {
        console.log('valueddd', value);
        this.boatId = value;
    }
    
    // public
    @api
    similarBy;
    
    // Wire custom Apex call, using the import named getSimilarBoats
    // Populates the relatedBoats list
    @wire(getSimilarBoats,{ boatId: '$boatId',  similarBy: '$similarBy'})
    similarBoats({ error, data }) { 
        if (data) {
            console.log('similar boats', JSON.stringify(data));
            this.relatedBoats = data;
        } else if (error) {
            console.log('error');
        }
    }
    
    
    get getTitle() {
      return 'Similar boats by ' + this.similarBy;
    }
    get noBoats() {
      return !(this.relatedBoats && this.relatedBoats.length > 0);
    }
    
    // Navigate to record page
    openBoatDetailPage(event) { 
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.boatId,
                objectApiName: BOAT_OBJECT,
                actionName: 'view'
            },
        });
    }

  }
  