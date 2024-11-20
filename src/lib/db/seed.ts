import {createKysely} from "@vercel/postgres-kysely";
import {Database} from "@/lib/db/types";

export async function seed2() {
    const db = createKysely<Database>()
    // Вставка данных в таблицу brand
    const brandData = [
        {brand_name: 'Toyota'},
        {brand_name: 'Tesla'},
        {brand_name: 'BMW'},
        {brand_name: 'Mercedes-Benz'},
        {brand_name: 'Audi'},
        {brand_name: 'Honda'},
        {brand_name: 'Ford'},
        {brand_name: 'Volkswagen'},
        {brand_name: 'Nissan'},
        {brand_name: 'Hyundai'},
        {brand_name: 'Kia'},
        {brand_name: 'Mazda'},
        {brand_name: 'Subaru'},
        {brand_name: 'Lexus'},
        {brand_name: 'Volvo'},
        {brand_name: 'Porsche'},
        {brand_name: 'Jaguar'},
        {brand_name: 'Land Rover'},
        {brand_name: 'Chevrolet'},
        {brand_name: 'Jeep'}
    ];

    const insertBrands = await db
        .insertInto('brand')
        .values(brandData)
        .execute();

    console.log(`Добавлено ${insertBrands.length} брендов в таблицу brand`);

    // Вставка данных в таблицу model
    const modelData = [
        {model_name: 'Camry', model_brand_id: 1},
        {model_name: 'Corolla', model_brand_id: 1},
        {model_name: 'RAV4', model_brand_id: 1},
        {model_name: 'Highlander', model_brand_id: 1},
        {model_name: 'Model 3', model_brand_id: 2},
        {model_name: 'Model S', model_brand_id: 2},
        {model_name: 'Model X', model_brand_id: 2},
        {model_name: 'Model Y', model_brand_id: 2},
        {model_name: '3 Series', model_brand_id: 3},
        {model_name: '5 Series', model_brand_id: 3},
        {model_name: 'X3', model_brand_id: 3},
        {model_name: 'X5', model_brand_id: 3},
        {model_name: 'C-Class', model_brand_id: 4},
        {model_name: 'E-Class', model_brand_id: 4},
        {model_name: 'GLC', model_brand_id: 4},
        {model_name: 'S-Class', model_brand_id: 4},
        {model_name: 'A4', model_brand_id: 5},
        {model_name: 'Q5', model_brand_id: 5},
        {model_name: 'A6', model_brand_id: 5},
        {model_name: 'Q7', model_brand_id: 5},
        {model_name: 'Civic', model_brand_id: 6},
        {model_name: 'Accord', model_brand_id: 6},
        {model_name: 'CR-V', model_brand_id: 6},
        {model_name: 'Pilot', model_brand_id: 6},
        {model_name: 'Mustang', model_brand_id: 7},
        {model_name: 'F-150', model_brand_id: 7},
        {model_name: 'Explorer', model_brand_id: 7},
        {model_name: 'Escape', model_brand_id: 7},
        {model_name: 'Golf', model_brand_id: 8},
        {model_name: 'Passat', model_brand_id: 8},
        {model_name: 'Tiguan', model_brand_id: 8},
        {model_name: 'Atlas', model_brand_id: 8},
        {model_name: 'Altima', model_brand_id: 9},
        {model_name: 'Rogue', model_brand_id: 9},
        {model_name: 'Sentra', model_brand_id: 9},
        {model_name: 'Maxima', model_brand_id: 9},
        {model_name: 'Elantra', model_brand_id: 10},
        {model_name: 'Tucson', model_brand_id: 10},
        {model_name: 'Santa Fe', model_brand_id: 10},
        {model_name: 'Sonata', model_brand_id: 10},
        {model_name: 'Optima', model_brand_id: 11},
        {model_name: 'Sportage', model_brand_id: 11},
        {model_name: 'Sorento', model_brand_id: 11},
        {model_name: 'Telluride', model_brand_id: 11},
        {model_name: 'Mazda3', model_brand_id: 12},
        {model_name: 'Mazda6', model_brand_id: 12},
        {model_name: 'CX-5', model_brand_id: 12},
        {model_name: 'CX-9', model_brand_id: 12},
        {model_name: 'Impreza', model_brand_id: 13},
        {model_name: 'Outback', model_brand_id: 13},
        {model_name: 'Forester', model_brand_id: 13},
        {model_name: 'Crosstrek', model_brand_id: 13},
        {model_name: 'RX', model_brand_id: 14},
        {model_name: 'ES', model_brand_id: 14},
        {model_name: 'NX', model_brand_id: 14},
        {model_name: 'IS', model_brand_id: 14},
        {model_name: 'XC90', model_brand_id: 15},
        {model_name: 'XC60', model_brand_id: 15},
        {model_name: 'S60', model_brand_id: 15},
        {model_name: 'V60', model_brand_id: 15},
        {model_name: '911', model_brand_id: 16},
        {model_name: 'Cayenne', model_brand_id: 16},
        {model_name: 'Panamera', model_brand_id: 16},
        {model_name: 'Macan', model_brand_id: 16},
        {model_name: 'XE', model_brand_id: 17},
        {model_name: 'XF', model_brand_id: 17},
        {model_name: 'F-PACE', model_brand_id: 17},
        {model_name: 'E-PACE', model_brand_id: 17},
        {model_name: 'Range Rover', model_brand_id: 18},
        {model_name: 'Discovery', model_brand_id: 18},
        {model_name: 'Evoque', model_brand_id: 18},
        {model_name: 'Velar', model_brand_id: 18},
        {model_name: 'Malibu', model_brand_id: 19},
        {model_name: 'Equinox', model_brand_id: 19},
        {model_name: 'Silverado', model_brand_id: 19},
        {model_name: 'Traverse', model_brand_id: 19},
        {model_name: 'Wrangler', model_brand_id: 20},
        {model_name: 'Grand Cherokee', model_brand_id: 20},
        {model_name: 'Cherokee', model_brand_id: 20},
        {model_name: 'Compass', model_brand_id: 20}
    ];

    const insertModels = await db
        .insertInto('model')
        .values(modelData)
        .execute();

    console.log(`Добавлено ${insertModels.length} моделей в таблицу model`);

    // Данные для таблицы color
    const colorData = [
        {color_name: 'Чорний', color_value: '#000000'},
        {color_name: 'Білий', color_value: '#FFFFFF'},
        {color_name: 'Сірий', color_value: '#808080'},
        {color_name: 'Червоний', color_value: '#FF0000'},
        {color_name: 'Синій', color_value: '#0000FF'},
        {color_name: 'Зелений', color_value: '#008000'},
        {color_name: 'Жовтий', color_value: '#FFFF00'},
        {color_name: 'Коричневий', color_value: '#A52A2A'},
        {color_name: 'Помаранчевий', color_value: '#FFA500'},
        {color_name: 'Фіолетовий', color_value: '#800080'}
    ];

    const insertColors = await db
        .insertInto('color')
        .values(colorData)
        .execute();

    console.log(`Додано ${insertColors.length} кольорів до таблиці color`);

    // Данные для таблицы fuel_type
    const fuelTypeData = [
        {fuel_type_name: 'Бензин'},
        {fuel_type_name: 'Дизель'},
        {fuel_type_name: 'Електро'},
        {fuel_type_name: 'Гібрид'},
        {fuel_type_name: 'Газ'}
    ];

    const insertFuelTypes = await db
        .insertInto('fuel_type')
        .values(fuelTypeData)
        .execute();

    console.log(`Додано ${insertFuelTypes.length} типів палива до таблиці fuel_type`);

    // Данные для таблицы gear_type
    const gearTypeData = [
        {gear_type_name: 'Механічна'},
        {gear_type_name: 'Автоматична'},
        {gear_type_name: 'Роботизована'},
        {gear_type_name: 'Варіатор'}
    ];

    const insertGearTypes = await db
        .insertInto('gear_type')
        .values(gearTypeData)
        .execute();

    console.log(`Додано ${insertGearTypes.length} типів коробки передач до таблиці gear_type`);

    // Данные для таблицы city
    const cityData = [
        {city_name: 'Київ'},
        {city_name: 'Харків'},
        {city_name: 'Одеса'},
        {city_name: 'Дніпро'},
        {city_name: 'Донецьк'},
        {city_name: 'Запоріжжя'},
        {city_name: 'Львів'},
        {city_name: 'Кропивницький'},
        {city_name: 'Миколаїв'},
        {city_name: 'Херсон'},
        {city_name: 'Полтава'},
        {city_name: 'Чернігів'},
        {city_name: 'Черкаси'},
        {city_name: 'Житомир'},
        {city_name: 'Суми'},
        {city_name: 'Рівне'},
        {city_name: 'Івано-Франківськ'},
        {city_name: 'Вінниця'},
        {city_name: 'Луцьк'},
        {city_name: 'Ужгород'},
        {city_name: 'Тернопіль'},
        {city_name: 'Хмельницький'},
        {city_name: 'Чернівці'}
    ];

    const insertCities = await db
        .insertInto('city')
        .values(cityData)
        .execute();

    console.log(`Додано ${insertCities.length} міст до таблиці city`);

    // Данные для таблицы car_type
    const carTypeData = [
        {car_type_name: 'Легковий'},
        {car_type_name: 'Вантажний'},
        {car_type_name: 'Мотоцикл'},
        {car_type_name: 'Автобус'}
    ];

    const insertCarTypes = await db
        .insertInto('car_type')
        .values(carTypeData)
        .execute();

    console.log(`Додано ${insertCarTypes.length} типів автомобілів до таблиці car_type`);

    // Данные для таблицы body_type
    const bodyTypeData = [
        {body_type_name: 'Седан', body_car_type_id: 1},
        {body_type_name: 'Хетчбек', body_car_type_id: 1},
        {body_type_name: 'Універсал', body_car_type_id: 1},
        {body_type_name: 'Купе', body_car_type_id: 1},
        {body_type_name: 'Кабріолет', body_car_type_id: 1},
        {body_type_name: 'Позашляховик', body_car_type_id: 1},
        {body_type_name: 'Мінівен', body_car_type_id: 1},
        {body_type_name: 'Пікап', body_car_type_id: 1},
        {body_type_name: 'Фургон', body_car_type_id: 2},
        {body_type_name: 'Тягач', body_car_type_id: 2}
    ];

    const insertBodyTypes = await db
        .insertInto('body_type')
        .values(bodyTypeData)
        .execute();

    console.log(`Додано ${insertBodyTypes.length} типів кузова до таблиці body_type`);

    // Данные для таблицы feature
    const featureData = [
        {feature_name: 'Кондиціонер'},
        {feature_name: 'Клімат-контроль'},
        {feature_name: 'Підігрів сидінь'},
        {feature_name: 'Круїз-контроль'},
        {feature_name: 'Парктронік'},
        {feature_name: 'Камера заднього виду'},
        {feature_name: 'Шкіряний салон'},
        {feature_name: 'Люк'},
        {feature_name: 'Навігаційна система'},
        {feature_name: 'Bluetooth'},
        {feature_name: 'USB'},
        {feature_name: 'Бортовий комп\'ютер'},
        {feature_name: 'Підсилювач керма'},
        {feature_name: 'Електропривід дзеркал'},
        {feature_name: 'Електропривід сидінь'}
    ];

    const insertFeatures = await db
        .insertInto('feature')
        .values(featureData)
        .execute();

    console.log(`Додано ${insertFeatures.length} функцій до таблиці feature`);


    // Данные для таблицы car
    const carData = [
        {
            car_model_id: 1,
            car_year: 2020,
            car_fuel_type_id: 1,
            car_gear_type_id: 1,
            car_mileage: 50000,
            car_price: 15000,
            car_user_id: 1,
            car_status: 'ON_SALE',
            car_color_id: 1,
            car_created_at: new Date(),
            car_vin: 'ABC123456789',
            car_description: 'Відмінний стан, один власник',
            car_body_type_id: 1,
            car_accident: false,
            car_abroad: false,
            car_owner_number: 1,
            car_in_credit: false,
            car_power: 150,
            car_seat: 5,
            car_drive_type: 'FWD'
        },
        {
            car_model_id: 2,
            car_year: 2019,
            car_fuel_type_id: 2,
            car_gear_type_id: 2,
            car_mileage: 75000,
            car_price: 12000,
            car_user_id: 2,
            car_status: 'ON_SALE',
            car_color_id: 2,
            car_created_at: new Date(),
            car_vin: 'DEF987654321',
            car_description: 'Гарний стан, регулярне обслуговування',
            car_body_type_id: 2,
            car_accident: true,
            car_abroad: true,
            car_owner_number: 2,
            car_in_credit: false,
            car_power: 120,
            car_seat: 4,
            car_drive_type: 'RWD'
        },
        {
            car_model_id: 3,
            car_year: 2021,
            car_fuel_type_id: 3,
            car_gear_type_id: 1,
            car_mileage: 30000,
            car_price: 20000,
            car_user_id: 3,
            car_status: 'ON_SALE',
            car_color_id: 3,
            car_created_at: new Date(),
            car_vin: 'GHI246813579',
            car_description: 'Як новий, повна комплектація',
            car_body_type_id: 3,
            car_accident: false,
            car_abroad: false,
            car_owner_number: 1,
            car_in_credit: true,
            car_power: 180,
            car_seat: 7,
            car_drive_type: 'AWD'
        }
    ];

    const insertCars = await db
        .insertInto('car')
        .values(carData)
        .execute();

    console.log(`Додано ${insertCars.length} автомобілів до таблиці car`);
}

export async function seed() {
    const db = createKysely<Database>()

    /*// Дані для таблиці account
    const accountData = [
        /!*{
            user_login: 'user1',
            user_password_hash: 'хеш_пароля_1',
            user_created_at: new Date()
        },
        {
            user_login: 'user2',
            user_password_hash: 'хеш_пароля_2',
            user_created_at: new Date()
        },
        {
            user_login: 'user3',
            user_password_hash: 'хеш_пароля_3',
            user_created_at: new Date()
        }*!/

        {
            user_login: 'user4',
            user_password_hash: 'хеш_пароля_1',
            user_created_at: new Date()
        },
        {
            user_login: 'user5',
            user_password_hash: 'хеш_пароля_2',
            user_created_at: new Date()
        },
        {
            user_login: 'user6',
            user_password_hash: 'хеш_пароля_3',
            user_created_at: new Date()
        },
        {
            user_login: 'user7',
            user_password_hash: 'хеш_пароля_1',
            user_created_at: new Date()
        },
        {
            user_login: 'user8',
            user_password_hash: 'хеш_пароля_2',
            user_created_at: new Date()
        },
        {
            user_login: 'user9',
            user_password_hash: 'хеш_пароля_3',
            user_created_at: new Date()
        }
    ];

    const insertAccounts = await db
        .insertInto('account')
        .values(accountData)
        .execute();

    console.log(`Додано ${insertAccounts.length} акаунтів до таблиці account`);*/

    // Дані для таблиці user
    const userData = [
        /* {
             user_id: 1,
             user_first_name: 'Іван',
             user_last_name: 'Петренко',
             user_phone: '+380991234567',
             user_city_id: 1,
             user_email: 'ivan@example.com'
         },
         {
             user_id: 2,
             user_first_name: 'Марія',
             user_last_name: 'Коваленко',
             user_phone: '+380992345678',
             user_city_id: 2,
             user_email: 'maria@example.com'
         },
         {
             user_id: 3,
             user_first_name: 'Олексій',
             user_last_name: 'Сидоренко',
             user_phone: '+380993456789',
             user_city_id: 3,
             user_email: 'oleksiy@example.com'
         }, */
        {
            user_id: 6,
            user_first_name: 'Анна',
            user_last_name: 'Мельник',
            user_phone: '+380994567890',
            user_city_id: 4,
            user_email: 'anna@example.com'
        },
        {
            user_id: 7,
            user_first_name: 'Віктор',
            user_last_name: 'Коваль',
            user_phone: '+380995678901',
            user_city_id: 5,
            user_email: 'viktor@example.com'
        },
        {
            user_id: 8,
            user_first_name: 'Ольга',
            user_last_name: 'Петрова',
            user_phone: '+380996789012',
            user_city_id: 6,
            user_email: 'olga@example.com'
        },
        {
            user_id: 9,
            user_first_name: 'Дмитро',
            user_last_name: 'Іванов',
            user_phone: '+380997890123',
            user_city_id: 7,
            user_email: 'dmitro@example.com'
        },
        {
            user_id: 10,
            user_first_name: 'Євгенія',
            user_last_name: 'Сергєєва',
            user_phone: '+380998901234',
            user_city_id: 8,
            user_email: 'evgeniya@example.com'
        },
        {
            user_id: 11,
            user_first_name: 'Олександр',
            user_last_name: 'Павлов',
            user_phone: '+380999012345',
            user_city_id: 9,
            user_email: 'oleksandr@example.com'
        }
    ];

    const insertUsers = await db
        .insertInto('user')
        .values(userData)
        .execute();

    console.log(`Додано ${insertUsers.length} користувачів до таблиці user`);

}