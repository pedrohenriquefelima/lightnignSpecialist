import { LightningElement, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    
    // Private
    error = undefined;
    
    searchOptions;
    
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
      if (data) {
        this.searchOptions = data.map(type => {
          return { label: type.Name, value: type.Id }
        });
        this.searchOptions.unshift({ label: 'All Types', value: '' });
        this.selectedBoatTypeId = this.searchOptions[0].value;
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
      // Create the const searchEvent
      // searchEvent must be the new custom event search
      this.selectedBoatTypeId = event.target.value;
      console.log('value selected',this.selectedBoatTypeId)
      const searchEvent = new CustomEvent("search", { detail: { boatTypeId: this.selectedBoatTypeId } });
      this.dispatchEvent(searchEvent);
    }
  }