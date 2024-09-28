import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE} from "lightning/messageService";
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from "lightning/navigation";

import BOATMC from "@salesforce/messageChannel/BoatMessageChannel__c";
import labelDetails from '@salesforce/label/c.Details';
import labelFullDetails from '@salesforce/label/c.Full_Details';
import labelAddReview from '@salesforce/label/c.Add_Review';
import labelReviews from '@salesforce/label/c.Reviews';
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat';
const BOAT_FIELDS = ['Boat__c.Id', 'Boat__c.Name'];

export default class BoatDetailTabs extends NavigationMixin(LightningElement) {
    boatId;
    data;

    @wire(getRecord, { recordId: "$boatId", fields: BOAT_FIELDS })
    wiredRecord;

    label = {
        labelDetails,
        labelFullDetails,
        labelAddReview,
        labelReviews,
        labelPleaseSelectABoat
      };

    // Initialize messageContext for Message Service
    @wire(MessageContext)
    messageContext;

    // Decide when to show or hide the icon
    // returns 'utility:anchor' or null
    get detailsTabIconName() { 
        return this.wiredRecord.data ? 'utility:anchor' : null;
    }
    
    // Utilize getFieldValue to extract the boat name from the record wire
    get boatName() {
        return getFieldValue(this.wiredRecord.data, BOAT_FIELDS[1])
     }
    
    // Private
    subscription = null;

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
    
    // Subscribe to the message channel
    subscribeMC() {
        // local boatId must receive the recordId from the message
        if (this.subscription) {
            return;
        }
        // Subscribe to the message channel to retrieve the recordId and explicitly assign it to boatId.
        this.subscription = subscribe(this.messageContext,BOATMC,(message) => {
            this.boatId = message.recordId;
        },{ scope: APPLICATION_SCOPE });
    }
    
    // Calls subscribeMC()
    connectedCallback() { 
        this.subscribeMC();
    }
    
    // Navigates to record page
    navigateToRecordViewPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.boatId,
                actionName: 'view',
            },
        });
     }
    
    // Navigates back to the review list, and refreshes reviews component
    handleReviewCreated() {
        console.log('navigating to reviews');
        this.template.querySelector('lightning-tabset').activeTabValue = 'reviews';
     }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
      }
}