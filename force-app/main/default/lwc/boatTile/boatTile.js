import { LightningElement, api} from 'lwc';

// imports
const TILE_WRAPPER_SELECTED_CLASS  = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper'
export default class BoatTile extends LightningElement {
    @api boat;
    selectedBoatId;
    
    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() {
        return `background-image:url(${this.boat?.Picture__c})`
     }
    
    // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() { 
        return this.selectedBoatId ? TILE_WRAPPER_SELECTED_CLASS : TILE_WRAPPER_UNSELECTED_CLASS;
    }

    get boatName() {
        return this.boat?.Name;
    }

    get boatContact() {
        return this.boat?.Contact__r?.Name;
    }

    get boatLength() {
        return this.boat?.Length__c;
    }

    get boatPrice() {
        return this.boat?.Price__c;
    }

    get boatType() {
        return this.boat?.BoatType__r.Name;
    }
    
    // Fires event with the Id of the boat that has been selected.
    selectBoat() {
        this.selectedBoatId = this?.boat?.Id;
        const selectedBoat = new CustomEvent("boatselect", { detail: this.selectedBoatId });
        this.dispatchEvent(selectedBoat);
     }
  }
  