package com.example.breeze;

import com.example.breeze.entity.*;
import com.example.breeze.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Transient;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootApplication
public class BreezeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BreezeApplication.class, args);
	}

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	CarCategoryRepository carCategoryRepository;

	@Autowired
	CarRepository carRepository;

	@Autowired
	LocationRepository locationRepository;

	@Autowired
	BookingRepository bookingRepository;

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	RentalCarInsuranceRepository rentalCarInsuranceRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Bean
	CommandLineRunner runner () {
		return args -> {
			if (!roleRepository.existsByName(ERole.USER)) {
				roleRepository.save(new Role(ERole.USER));
				roleRepository.save(new Role(ERole.ADMIN));
			}

			if(!carCategoryRepository.existsByCarCategoryName("City Car")){
				//CITY CARS
				// MINI CARS
				CarEntity fiat500 = CarEntity.builder()
						.plateNumber("VL125RCA")
						.modelName("Fiat 500")
						.modelYear(2019)
						.mileage(Long.valueOf(30000))
						.transmission("Manual Transmission")
						.costPerDay(45)
						.availabilityFlag(true)
						.build();

				CarEntity renaultTwingo = CarEntity.builder()
						.plateNumber("B002DBR")
						.modelName("Renault Twingo")
						.modelYear(2020)
						.mileage(Long.valueOf(33000))
						.transmission("Manual Transmission")
						.costPerDay(40)
						.availabilityFlag(true)
						.build();

				CarCategoryEntity miniCityCarCategory = CarCategoryEntity.builder()
						.carCategoryName("City Car")
						.subcategory("Mini")
						.noOfLuggage(1)
						.noOfPersons(4)
						.noOfDoors(2)
						.minimumDrivingAge(18)
						.insuranceMultiplier(1.f)
						.lateFeePerHour(5)
						.carEntities(List.of(fiat500, renaultTwingo))
						.build();
				carCategoryRepository.save(miniCityCarCategory);
				fiat500.setCategory(miniCityCarCategory);
				renaultTwingo.setCategory(miniCityCarCategory);
				carRepository.saveAll(List.of(fiat500, renaultTwingo));

				// ECONOMY CARS
				CarEntity fiatPanda = CarEntity.builder()
						.plateNumber("B281RMN")
						.modelName("Fiat Panda")
						.modelYear(2019)
						.mileage(Long.valueOf(45000))
						.transmission("Manual Transmission")
						.costPerDay(60)
						.availabilityFlag(true)
						.build();

				CarEntity peugeot208 = CarEntity.builder()
						.plateNumber("B168BRG")
						.modelName("Peugeot 208")
						.modelYear(2018)
						.mileage(Long.valueOf(42000))
						.transmission("Manual Transmission")
						.costPerDay(63)
						.availabilityFlag(true)
						.build();

				CarEntity citroenC3 = CarEntity.builder()
						.plateNumber("B068EMG")
						.modelName("Citroen C3")
						.modelYear(2021)
						.mileage(Long.valueOf(10000))
						.transmission("Manual Transmission")
						.costPerDay(67)
						.availabilityFlag(true)
						.build();

				CarEntity opelCorsa = CarEntity.builder()
						.plateNumber("GR091EBB")
						.modelName("Opel Corsa")
						.modelYear(2019)
						.mileage(Long.valueOf(41200))
						.transmission("Manual Transmission")
						.costPerDay(68)
						.availabilityFlag(true)
						.build();

				CarCategoryEntity economyCityCarCategory = CarCategoryEntity.builder()
						.carCategoryName("City Car")
						.subcategory("Economy")
						.noOfLuggage(2)
						.noOfPersons(4)
						.noOfDoors(3)
						.minimumDrivingAge(18)
						.insuranceMultiplier(1.2f)
						.lateFeePerHour(6)
						.carEntities(List.of(fiatPanda, peugeot208, citroenC3, opelCorsa))
						.build();
				carCategoryRepository.save(economyCityCarCategory);
				fiatPanda.setCategory(economyCityCarCategory);
				peugeot208.setCategory(economyCityCarCategory);
				citroenC3.setCategory(economyCityCarCategory);
				opelCorsa.setCategory(economyCityCarCategory);
				carRepository.saveAll(List.of(fiatPanda, peugeot208, citroenC3, opelCorsa));

				// COMPACT CARS
				CarEntity toyotaCorolla = CarEntity.builder()
						.plateNumber("TR761MRC")
						.modelName("ToyotaCorolla")
						.modelYear(2020)
						.mileage(Long.valueOf(33000))
						.transmission("Manual Transmission")
						.costPerDay(85)
						.availabilityFlag(true)
						.build();

				CarEntity nissanQashqai = CarEntity.builder()
						.plateNumber("B025DOB")
						.modelName("Nissan Qashqai")
						.modelYear(2017)
						.mileage(Long.valueOf(56000))
						.transmission("Manual Transmission")
						.costPerDay(88)
						.availabilityFlag(true)
						.build();

				CarEntity hyundaiTucson = CarEntity.builder()
						.plateNumber("B992UIN")
						.modelName("Hyundai Tucson")
						.modelYear(2021)
						.mileage(Long.valueOf(15000))
						.transmission("Automatic Transmission")
						.costPerDay(93)
						.availabilityFlag(true)
						.build();

				CarEntity volkswagenTRoc = CarEntity.builder()
						.plateNumber("B765MIC")
						.modelName("Volkswagen T-Roc")
						.modelYear(2020)
						.mileage(Long.valueOf(16500))
						.transmission("Manual Transmission")
						.costPerDay(95)
						.availabilityFlag(true)
						.build();

				CarEntity skodaKamiq = CarEntity.builder()
						.plateNumber("B298GHA")
						.modelName("Skoda Kamiq")
						.modelYear(2020)
						.mileage(Long.valueOf(13000))
						.transmission("Automatic Transmission")
						.costPerDay(88)
						.availabilityFlag(true)
						.build();

				CarCategoryEntity compactCityCarCategory = CarCategoryEntity.builder()
						.carCategoryName("City Car")
						.subcategory("Compact")
						.noOfLuggage(3)
						.noOfPersons(5)
						.noOfDoors(4)
						.minimumDrivingAge(21)
						.insuranceMultiplier(1.6f)
						.lateFeePerHour(8)
						.carEntities(List.of(toyotaCorolla, nissanQashqai, hyundaiTucson, volkswagenTRoc, skodaKamiq))
						.build();

				carCategoryRepository.save(compactCityCarCategory);
				toyotaCorolla.setCategory(compactCityCarCategory);
				nissanQashqai.setCategory(compactCityCarCategory);
				hyundaiTucson.setCategory(compactCityCarCategory);
				volkswagenTRoc.setCategory(compactCityCarCategory);
				skodaKamiq.setCategory(compactCityCarCategory);
				carRepository.saveAll(List.of(toyotaCorolla, nissanQashqai, hyundaiTucson, volkswagenTRoc, skodaKamiq));

				//STANDARD CARS
				CarEntity skodaOctaviaKombi = CarEntity.builder()
						.plateNumber("B721MCN")
						.modelName("Skoda Octavia Kombi")
						.modelYear(2019)
						.mileage(Long.valueOf(18000))
						.transmission("Automatic Transmission")
						.costPerDay(99)
						.availabilityFlag(true)
						.build();

				CarEntity peugeot508SW = CarEntity.builder()
						.plateNumber("B329BRC")
						.modelName("Peugeot 508 SW")
						.modelYear(2019)
						.mileage(Long.valueOf(21000))
						.transmission("Automatic Transmission")
						.costPerDay(96)
						.availabilityFlag(true)
						.build();

				CarEntity opelInsigniaSportstourer = CarEntity.builder()
						.plateNumber("B678JFR")
						.modelName("Opel Insignia Sportstourer")
						.modelYear(2020)
						.mileage(Long.valueOf(12000))
						.transmission("Manual Transmission")
						.costPerDay(103)
						.availabilityFlag(true)
						.build();

				CarCategoryEntity standardCityCarCategory = CarCategoryEntity.builder()
						.carCategoryName("City Car")
						.subcategory("Standard")
						.noOfLuggage(5)
						.noOfPersons(5)
						.noOfDoors(5)
						.minimumDrivingAge(21)
						.insuranceMultiplier(1.8f)
						.lateFeePerHour(10)
						.carEntities(List.of(skodaOctaviaKombi, peugeot508SW, opelInsigniaSportstourer))
						.build();

				carCategoryRepository.save(standardCityCarCategory);
				skodaOctaviaKombi.setCategory(standardCityCarCategory);
				peugeot508SW.setCategory(standardCityCarCategory);
				opelInsigniaSportstourer.setCategory(standardCityCarCategory);
				carRepository.saveAll(List.of(skodaOctaviaKombi, peugeot508SW, opelInsigniaSportstourer));


				// ELECTRIC CARS
				CarEntity opelCrossland = CarEntity.builder()
						.plateNumber("B129KOQ")
						.modelName("Opel Crossland")
						.modelYear(2020)
						.mileage(Long.valueOf(15000))
						.transmission("Automatic Transmission")
						.costPerDay(98)
						.availabilityFlag(true)
						.build();

				CarEntity volkswagenPolo = CarEntity.builder()
						.plateNumber("B583OIA")
						.modelName("Volkswagen Polo")
						.modelYear(2020)
						.mileage(Long.valueOf(14300))
						.transmission("Automatic Transmission")
						.costPerDay(67)
						.availabilityFlag(true)
						.build();

				CarEntity opelInsignia = CarEntity.builder()
						.plateNumber("B905PKQ")
						.modelName("Opel Insignia")
						.modelYear(2019)
						.mileage(Long.valueOf(24500))
						.transmission("Automatic Transmission")
						.costPerDay(101)
						.availabilityFlag(true)
						.build();

				CarEntity teslaModel3 = CarEntity.builder()
						.plateNumber("B112RKV")
						.modelName("Tesla Model 3")
						.modelYear(2020)
						.mileage(Long.valueOf(16800))
						.transmission("Automatic Transmission")
						.costPerDay(180)
						.availabilityFlag(true)
						.build();

				CarCategoryEntity electricCarCategory = CarCategoryEntity.builder()
						.carCategoryName("Electric")
						.subcategory("Electric")
						.noOfLuggage(3)
						.noOfPersons(5)
						.noOfDoors(4)
						.minimumDrivingAge(21)
						.insuranceMultiplier(2.1f)
						.lateFeePerHour(10)
						.carEntities(List.of(opelCrossland, volkswagenPolo, opelInsignia, teslaModel3))
						.build();
				carCategoryRepository.save(electricCarCategory);
				opelCrossland.setCategory(electricCarCategory);
				volkswagenPolo.setCategory(electricCarCategory);
				opelInsignia.setCategory(electricCarCategory);
				teslaModel3.setCategory(electricCarCategory);
				carRepository.saveAll(List.of(opelCrossland, volkswagenPolo, opelInsignia, teslaModel3));

				//PRESTIGE
				//LUXURY CARS
				CarEntity mercedesClasseA = CarEntity.builder()
						.plateNumber("B743RPQ")
						.modelName("Mercedes Classe A")
						.modelYear(2020)
						.mileage(Long.valueOf(11100))
						.transmission("Automatic Transmission")
						.costPerDay(121)
						.availabilityFlag(true)
						.build();

				CarEntity mercedesGla = CarEntity.builder()
						.plateNumber("B108OBQ")
						.modelName("Mercedes GLA")
						.modelYear(2020)
						.mileage(Long.valueOf(12200))
						.transmission("Automatic Transmission")
						.costPerDay(134)
						.availabilityFlag(true)
						.build();

				CarEntity renaultTalisman = CarEntity.builder()
						.plateNumber("B127OBQ")
						.modelName("Renault Talisman")
						.modelYear(2020)
						.mileage(Long.valueOf(12200))
						.transmission("Automatic Transmission")
						.costPerDay(117)
						.availabilityFlag(true)
						.build();

				CarEntity mercedesBenzCKlasseLimousine = CarEntity.builder()
						.plateNumber("B289MKL")
						.modelName("Mercedes-Benz C Klasse Limousine")
						.modelYear(2020)
						.mileage(Long.valueOf(13800))
						.transmission("Automatic Transmission")
						.costPerDay(148)
						.availabilityFlag(true)
						.build();


				CarCategoryEntity luxuryPrestigeCarCategory = CarCategoryEntity.builder()
						.carCategoryName("Prestige")
						.subcategory("Luxury")
						.noOfLuggage(3)
						.noOfPersons(5)
						.noOfDoors(5)
						.minimumDrivingAge(23)
						.insuranceMultiplier(2.8f)
						.lateFeePerHour(25)
						.carEntities(List.of(mercedesClasseA, mercedesGla, renaultTalisman, mercedesBenzCKlasseLimousine))
						.build();

				carCategoryRepository.save(luxuryPrestigeCarCategory);
				mercedesClasseA.setCategory(luxuryPrestigeCarCategory);
				mercedesGla.setCategory(luxuryPrestigeCarCategory);
				renaultTalisman.setCategory(luxuryPrestigeCarCategory);
				mercedesBenzCKlasseLimousine.setCategory(luxuryPrestigeCarCategory);
				carRepository.saveAll(List.of(mercedesClasseA, mercedesGla, renaultTalisman, mercedesBenzCKlasseLimousine));

				//SPORTS CARS
				CarEntity audiA7Sportback45Tfsi = CarEntity.builder()
						.plateNumber("B192RBK")
						.modelName("Audi A7-SPORTBACK 45 TFSI")
						.modelYear(2020)
						.mileage(Long.valueOf(15300))
						.transmission("Automatic Transmission")
						.costPerDay(150)
						.availabilityFlag(true)
						.build();


				CarCategoryEntity sportsPrestigeCarCategory = CarCategoryEntity.builder()
						.carCategoryName("Prestige")
						.subcategory("Sports Car")
						.noOfLuggage(1)
						.noOfPersons(4)
						.noOfDoors(3)
						.minimumDrivingAge(23)
						.insuranceMultiplier(2.8f)
						.lateFeePerHour(25)
						.carEntities(List.of(teslaModel3, audiA7Sportback45Tfsi))
						.build();
				carCategoryRepository.save(sportsPrestigeCarCategory);
				audiA7Sportback45Tfsi.setCategory(sportsPrestigeCarCategory);
				carRepository.saveAll(List.of(audiA7Sportback45Tfsi));


				// VANS
				CarEntity volkswagenT6Kombi = CarEntity.builder()
						.plateNumber("B856JSO")
						.modelName("Volkswagen T6 Kombi")
						.modelYear(2019)
						.mileage(Long.valueOf(24300))
						.transmission("Manual Transmission")
						.costPerDay(155)
						.availabilityFlag(true)
						.build();

				CarEntity volkswagenMultivan = CarEntity.builder()
						.plateNumber("B134TKO")
						.modelName("Volkswagen Multivan")
						.modelYear(2019)
						.mileage(Long.valueOf(24300))
						.transmission("Manual Transmission")
						.costPerDay(162)
						.availabilityFlag(true)
						.build();


				CarCategoryEntity vanCarCategory = CarCategoryEntity.builder()
						.carCategoryName("Van")
						.subcategory("Van")
						.noOfLuggage(7)
						.noOfPersons(5)
						.noOfDoors(3)
						.minimumDrivingAge(23)
						.insuranceMultiplier(2.1f)
						.lateFeePerHour(25)
						.carEntities(List.of(volkswagenT6Kombi, volkswagenMultivan))
						.build();
				carCategoryRepository.save(vanCarCategory);
				volkswagenMultivan.setCategory(vanCarCategory);
				volkswagenT6Kombi.setCategory(vanCarCategory);
				carRepository.saveAll(List.of(volkswagenT6Kombi, volkswagenMultivan));

				LocationEntity henriCoandaAirport = LocationEntity.builder()
						.locationName("Henri Coanda Airport, Ilfov")
						.city("Ilfov")
						.street("Calea Bucureştilor 224E")
						.zipcode("010667")
						.carEntities(List.of(
								fiat500, fiatPanda, peugeot208, citroenC3, toyotaCorolla, hyundaiTucson,
								peugeot208, opelCrossland, mercedesGla,
								mercedesBenzCKlasseLimousine, teslaModel3, volkswagenMultivan
						))
						.build();

				LocationEntity baneasaAirport = LocationEntity.builder()
						.locationName("Baneasa Airport, Bucharest")
						.city("Bucharest")
						.street("Șoseaua București-Ploiești 40")
						.zipcode("013695")
						.carEntities(List.of(
								renaultTwingo, opelCorsa, toyotaCorolla, nissanQashqai, volkswagenTRoc, peugeot508SW,
								opelInsigniaSportstourer, mercedesClasseA, renaultTalisman,
								audiA7Sportback45Tfsi, volkswagenT6Kombi

						))
						.build();

				locationRepository.saveAll(List.of(henriCoandaAirport, baneasaAirport));

				RentalCarInsuranceEntity basicInsurance = RentalCarInsuranceEntity.builder()
						.coverageType("Basic")
						.costPerDay(0)
						.excess(50)
						.build();

				RentalCarInsuranceEntity mediumInsurance = RentalCarInsuranceEntity.builder()
						.coverageType("Medium")
						.costPerDay(12)
						.excess(22)
						.build();

				RentalCarInsuranceEntity premiumInsurance = RentalCarInsuranceEntity.builder()
						.coverageType("Premium")
						.costPerDay(16)
						.excess(0)
						.build();

				rentalCarInsuranceRepository.saveAll(List.of(basicInsurance, mediumInsurance, premiumInsurance));


				CustomerEntity admin = CustomerEntity.builder()
						.firstName("Andrei-Cristian")
						.lastName("Macadon")
						.email("andrei.macadon14@yahoo.com")
						.birthdate(new SimpleDateFormat("dd-MM-yyyy").parse("18-01-1999"))
						.phoneNumber("0773802016")
						.country("Romania")
						.city("Bucharest")
						.street("Aleea Resita D")
						.zipcode("078235")
						.driversLicenseNumber("0127894112")
						.licenseIssueDate(new SimpleDateFormat("dd-MM-yyyy").parse("16-03-2017"))
						.licenseExpiryDate(new SimpleDateFormat("dd-MM-yyyy").parse("17-03-2027"))
						.licenseIssueCountry("Romania")
						.password(passwordEncoder.encode("andreiparola"))
						.build();

				Set<Role> adminRoles = new HashSet<>();
				Role admin_role = roleRepository.findByName(ERole.ADMIN)
						.orElseThrow(() -> new RuntimeException("role ADMIN was not found"));
				Role user_role = roleRepository.findByName(ERole.USER)
						.orElseThrow(() -> new RuntimeException("role USER was not found"));
				adminRoles.addAll(List.of(admin_role, user_role));

				admin.setRoles(adminRoles);
				customerRepository.save(admin);
				//BOOKING OBJECT CREATION
//				CustomerEntity customer = customerRepository.findByEmail("george.simion@yahoo.com").orElseThrow(
//						() -> new RuntimeException("Error: Couldn't find the customer george simion in Breeze Application")
//				);
//				if(henriCoandaAirport.getCarEntities().contains(fiat500)){
//					fiat500.setAvailabilityFlag(false);
////					List<CarEntity> carEntityListOfHenriCoanda = henriCoandaAirport.getCarEntities();
////					carEntityListOfHenriCoanda.set(henriCoandaAirport.getCarEntities().indexOf(fiat500), fiat500);
//					carRepository.save(fiat500);
////					locationRepository.save(henriCoandaAirport);
//				}
//				LocationEntity henriCoandaUpdated = locationRepository.findByLocationName("Henri Coanda Airport, Ilfov")
//						.orElseThrow(() -> new RuntimeException("Couldn't find the HenriCoanda airport"));
//				System.out.println(henriCoandaUpdated.getCarEntities());
//
//				BookingEntity bookingEntity = BookingEntity.builder()
//						.fromDtTime(new Date())
//						.retDtTime(new Date())
//						.actualRetDtTime(new Date())
//						.bookingStatus("PENDING")
//						.customerEntity(customer)
//						.amount(400)
//						.bookingsCarEntity(fiat500)
//						.pickupLocation(henriCoandaAirport)
//						.dropLocation(baneasaAirport)
//						.build();
//
//
//				bookingRepository.save(bookingEntity);
			}
		};
	}
}
