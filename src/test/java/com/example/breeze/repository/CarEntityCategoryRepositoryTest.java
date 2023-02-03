package com.example.breeze.repository;

import com.example.breeze.entity.CarCategoryEntity;
import com.example.breeze.entity.CarEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CarEntityCategoryRepositoryTest {

    @Autowired
    CarCategoryRepository carCategoryRepository;

    @Autowired
    CarRepository carRepository;

    @Test
    public void saveCarCategory() {

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
        carRepository.saveAll(List.of(fiat500, renaultTwingo));

        CarCategoryEntity miniCityCarCategory = CarCategoryEntity.builder()
                .carCategoryName("City Car")
                .subcategory("Mini")
                .noOfLuggage(1)
                .noOfPersons(4)
                .lateFeePerHour(5)
                .carEntities(List.of(fiat500, renaultTwingo))
                .build();
        carCategoryRepository.save(miniCityCarCategory);
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
        carRepository.saveAll(List.of(fiatPanda, peugeot208, citroenC3, opelCorsa));

        CarCategoryEntity economyCityCarCategory = CarCategoryEntity.builder()
                .carCategoryName("City Car")
                .subcategory("Economy")
                .noOfLuggage(2)
                .noOfPersons(4)
                .lateFeePerHour(6)
                .carEntities(List.of(fiatPanda, peugeot208, citroenC3, opelCorsa))
                .build();
        carCategoryRepository.save(economyCityCarCategory);

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
        carRepository.saveAll(List.of(toyotaCorolla, nissanQashqai, hyundaiTucson, volkswagenTRoc, skodaKamiq));

        CarCategoryEntity compactCityCarCategory = CarCategoryEntity.builder()
                .carCategoryName("City Car")
                .subcategory("Compact")
                .noOfLuggage(3)
                .noOfPersons(5)
                .lateFeePerHour(8)
                .carEntities(List.of(toyotaCorolla, nissanQashqai, hyundaiTucson, volkswagenTRoc, skodaKamiq))
                .build();

        carCategoryRepository.save(compactCityCarCategory);

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
        carRepository.saveAll(List.of(skodaOctaviaKombi, peugeot508SW, opelInsigniaSportstourer));

        CarCategoryEntity standardCityCarCategory = CarCategoryEntity.builder()
                .carCategoryName("City Car")
                .subcategory("Standard")
                .noOfLuggage(5)
                .noOfPersons(5)
                .lateFeePerHour(10)
                .carEntities(List.of(skodaOctaviaKombi, peugeot508SW, opelInsigniaSportstourer))
                .build();

        carCategoryRepository.save(standardCityCarCategory);

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
        carRepository.saveAll(List.of(opelCrossland, volkswagenPolo, opelInsignia, teslaModel3));

        CarCategoryEntity electricCarCategory = CarCategoryEntity.builder()
                .carCategoryName("Electric")
                .subcategory("Electric")
                .noOfLuggage(3)
                .noOfPersons(5)
                .lateFeePerHour(10)
                .carEntities(List.of(opelCrossland, volkswagenPolo, opelInsignia, teslaModel3))
                .build();
        carCategoryRepository.save(electricCarCategory);

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

        carRepository.saveAll(List.of(mercedesClasseA, mercedesGla, renaultTalisman, mercedesBenzCKlasseLimousine));

        CarCategoryEntity luxuryPrestigeCarCategory = CarCategoryEntity.builder()
                .carCategoryName("Prestige")
                .subcategory("Luxury")
                .noOfLuggage(3)
                .noOfPersons(5)
                .lateFeePerHour(25)
                .carEntities(List.of(mercedesClasseA, mercedesGla, renaultTalisman, mercedesBenzCKlasseLimousine))
                .build();

        carCategoryRepository.save(luxuryPrestigeCarCategory);

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
        carRepository.saveAll(List.of(audiA7Sportback45Tfsi));


        CarCategoryEntity sportsPrestigeCarCategory = CarCategoryEntity.builder()
                .carCategoryName("Prestige")
                .subcategory("Sports Car")
                .noOfLuggage(1)
                .noOfPersons(4)
                .lateFeePerHour(25)
                .carEntities(List.of(teslaModel3, audiA7Sportback45Tfsi))
                .build();
        carCategoryRepository.save(sportsPrestigeCarCategory);

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
        carRepository.saveAll(List.of(volkswagenT6Kombi, volkswagenMultivan));

        CarCategoryEntity vanCarCategory = CarCategoryEntity.builder()
                .carCategoryName("Prestige")
                .subcategory("Van")
                .noOfLuggage(7)
                .noOfPersons(5)
                .lateFeePerHour(25)
                .carEntities(List.of(volkswagenT6Kombi, volkswagenMultivan))
                .build();
        carCategoryRepository.save(vanCarCategory);

    }

    @Test
    public void getAllCarCategories() {
        List<CarCategoryEntity> carCategories = carCategoryRepository.findAll();
        System.out.println("All car categories are:\n" + carCategories);
    }

    @Test
    public void getCarsByCarCategoryName() {
        List<CarCategoryEntity> carCategoryEntities = carCategoryRepository.findByCarCategoryName("City Car");
        System.out.println("All city cars are:\n" + carCategoryEntities);
    }
}