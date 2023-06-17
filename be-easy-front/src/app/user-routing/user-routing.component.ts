import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ROLES, getEnumValueRole, variabilityConfig } from "app/_helpers/utils";
import { StorageService } from "app/_services/storage.service";
import * as Leaflet from 'leaflet'; 
import { latLng, tileLayer, Icon, icon, Marker } from "leaflet";
import "leaflet-routing-machine";

declare let L: { Routing: { control: (arg0: { waypoints: any[]; routeWhileDragging: boolean; }) => { (): any; new(): any; addTo: { (arg0: Leaflet.Map): void; new(): any; }; }; }; latLng: (arg0: number, arg1: number) => any; };

const customMarker = new Leaflet.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

@Component({
  selector: 'app-user-routing',
  templateUrl: './user-routing.component.html',
  styleUrls: ['./user-routing.component.css'],
})
export class UserRoutingComponent implements OnInit {
	mapEnabled = false;
  options = {
		layers: [
			tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution: "© OpenStreetMap contributors"
			})
		],
		zoom: 1,
		center: latLng(3.363666, -76.536061)
	};

	constructor(private storageService: StorageService) {}
	// Override default Icons
	private defaultIcon: Icon = icon({
		iconUrl: "assets/marker-icon.png",
		shadowUrl: "assets/marker-shadow.png"
	});

	ngOnInit() {
		Marker.prototype.options.icon = this.defaultIcon;
		this.enableDisableDownload();
	}

	onMapReady(map: L.Map) {
		L.Routing.control({
      waypoints: [L.latLng(3.47, -76.48), L.latLng(3.35, -76.53)],
			routeWhileDragging: true
		}).addTo(map);
	}

	download() {
		window.alert('Se descargo el mapa correctamente');
	}

	enableDisableDownload() {
		const user = this.storageService.getUser();
		console.log(user);
		const role = getEnumValueRole(user.roles[0]);
		const config = variabilityConfig[role as ROLES]
		this.mapEnabled = !config.map;
		console.log(config)
	}

}
