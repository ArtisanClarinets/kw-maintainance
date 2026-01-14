import { services } from './content/services';
import { serviceDetails } from './content/service-details';

const serviceIds = services.map(s => s.id);
const detailIds = Object.keys(serviceDetails);

console.log('Service IDs:', serviceIds);
console.log('Detail IDs:', detailIds);

const missingInDetails = serviceIds.filter(id => !detailIds.includes(id));
const missingInServices = detailIds.filter(id => !serviceIds.includes(id));

if (missingInDetails.length > 0) {
  console.error('CRITICAL: IDs in services.ts but missing in service-details.ts:', missingInDetails);
  process.exit(1);
} else {
  console.log('All service IDs have corresponding details.');
}

if (missingInServices.length > 0) {
    console.warn('WARNING: IDs in service-details.ts but missing in services.ts (cards won\'t show):', missingInServices);
}
