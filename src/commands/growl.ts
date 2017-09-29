import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt } from '../utils'

interface IMountain {
    name: string
    height: number
    img?: string
}

const MOUNTAINS: IMountain[] = [
    {
        name: 'Кула-Кангри', height: 7538,
        img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Kula_Kangri_from_Moenla_Karchung_1933·.jpg'
    },
    {
        name: 'Лупгхар-Шар', height: 7200,
        img: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/MorgendlKarakorum.jpg'
    },
    {
        name: 'Конгуртюбе', height: 7530,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Kongur_south.jpg/60px-Kongur_south.jpg'
    },
    {
        name: 'Канченджанга', height: 8586,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Kangchenjunga.JPG/60px-Kangchenjunga.JPG'
    },
    {
        name: 'Макалу', height: 8485,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Makalu.jpg/60px-Makalu.jpg'
    },
    {
        name: 'Чо-Ойю', height: 8188,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/ChoOyu-fromGokyo.jpg/60px-ChoOyu-fromGokyo.jpg'
    },
    {
        name: 'Дхаулагири', height: 8167,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dhaulagiri_-_view_from_aircraft.jpg/60px-Dhaulagiri_-_view_from_aircraft.jpg'
    },
    {
        name: 'Манаслу', height: 8163,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sunrise%2C_Manaslu.jpg/60px-Sunrise%2C_Manaslu.jpg'
    },
    {
        name: 'Нангапарбат', height: 8126,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Nanga_Parbat_View…om_Fairy_Meadow_trek.jpg/60px-Nanga_Parbat_View_from_Fairy_Meadow_trek.jpg'
    },
    {
        name: 'Аннапурна I', height: 8091,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Annapurna_I_ABC_Morning.jpg/60px-Annapurna_I_ABC_Morning.jpg'
    },
    {
        name: 'Гашербрум I', height: 8080,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/HiddenPeak.jpg/60px-HiddenPeak.jpg'
    },
    {
        name: 'Броуд-Пик', height: 8051,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/7_15_BroadPeak.jpg/60px-7_15_BroadPeak.jpg'
    },
    {
        name: 'Гашербрум II', height: 8034,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Gasherbrum2.jpg/60px-Gasherbrum2.jpg'
    },
    {
        name: 'Шишабангма', height: 8027,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Shisha_Pangma_2006.jpg/60px-Shisha_Pangma_2006.jpg'
    },
    {
        name: 'Гьячунг-Канг', height: 7952,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Gyachung_Kang.jpg/60px-Gyachung_Kang.jpg'
    },
    {
        name: 'Гашербрум III', height: 7946,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Gasherbrum2.jpg/60px-Gasherbrum2.jpg'
    },
    {
        name: 'Аннапурна II', height: 7937,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Annapurna_I.jpg/60px-Annapurna_I.jpg'
    },
    {
        name: 'Гашербрум IV', height: 7932,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Gasherbrum_group.JPG/60px-Gasherbrum_group.JPG'
    },
    {
        name: 'Хималчули', height: 7893,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Himalchuli_from_south.jpg/60px-Himalchuli_from_south.jpg'
    },
    {
        name: 'Дастогхил', height: 7884,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Distaghil_ISS.JPG/1200px-Distaghil_ISS.JPG'
    },
    {
        name: 'Нгади-Чули', height: 7871,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Manaslu_-_Thulagi_Chuli_-_Ngadi_Chuli.jpg/60px-Manaslu_-_Thulagi_Chuli_-_Ngadi_Chuli.jpg'
    },
    {
        name: 'Нупцзе', height: 7864,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Nuptse-fromLobuche.jpg/60px-Nuptse-fromLobuche.jpg'
    },
    {
        name: 'Кунианг-Киш', height: 7823,
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Kunyang_Pumari_Chhish.JPG'
    },
    {
        name: 'Машербрум', height: 7821,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Masherbrum.jpg/60px-Masherbrum.jpg'
    },
    {
        name: 'Нандадеви', height: 7816,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Nanda_devi.jpg/60px-Nanda_devi.jpg'
    },
    {
        name: 'Чомолонзо', height: 7804,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Everest_Region_in_Tibet.jpg/60px-Everest_Region_in_Tibet.jpg'
    },
    {
        name: 'Батура-Шар', height: 7795,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Batura_valley_Passu.jpg/60px-Batura_valley_Passu.jpg'
    },
    {
        name: 'Канжут-Шар', height: 7790,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kanjut_Sar.jpg/60px-Kanjut_Sar.jpg'
    },
    {
        name: 'Ракапоши', height: 7788,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/RakaposhiTagafari0889.JPG/60px-RakaposhiTagafari0889.JPG'
    },
    {
        name: 'Намджагбарва', height: 7782,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Namcha_Barwa_from_the_west.jpg/60px-Namcha_Barwa_from_the_west.jpg'
    },
    {
        name: 'Камет', height: 7756,
        img: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Kamet.jpg'
    },
    {
        name: 'Дхаулагири II', height: 7751,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dhaulagiri_-_view_from_aircraft.jpg/60px-Dhaulagiri_-_view_from_aircraft.jpg'
    },
    {
        name: 'Салторо-Кангри', height: 7742,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Saltoro_Kangri.jpg/60px-Saltoro_Kangri.jpg'
    },
    {
        name: 'Жанну', height: 7711,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Jannu_from_South.jpg/60px-Jannu_from_South.jpg'
    },
    {
        name: 'Тиричмир', height: 7708,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Tirich_Mir_Hotel.jpg/60px-Tirich_Mir_Hotel.jpg'
    },
    {
        name: 'Моламенкинг', height: 7703,
        img: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Shishapangma.jpg'
    },
    {
        name: 'Гурла-Мандхата', height: 7694,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Mt_Gurla_Mandhata_and_wild_Donkeys.jpg/60px-Mt_Gurla_Mandhata_and_wild_Donkeys.jpg'
    },
    {
        name: 'Сасер-Кангри I', height: 7672,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Saser_Kangri_III_and_II.jpg/60px-Saser_Kangri_III_and_II.jpg'
    },
    {
        name: 'Чоголиза', height: 7665,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Chogolisa_from_K2.JPG/60px-Chogolisa_from_K2.JPG'
    },
    {
        name: 'Дхаулагири IV', height: 7661,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dhaulagiri_-_view_from_aircraft.jpg/60px-Dhaulagiri_-_view_from_aircraft.jpg'
    },
    {
        name: 'Конгур', height: 7649,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Kongur_south.jpg/60px-Kongur_south.jpg'
    },
    {
        name: 'Дхаулагири V', height: 7618,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dhaulagiri_-_view_from_aircraft.jpg/60px-Dhaulagiri_-_view_from_aircraft.jpg'
    },
    {
        name: 'Шиспар', height: 7611,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/PassuMassif7476.JPG/60px-PassuMassif7476.JPG'
    },
    {
        name: 'Канкар-Пунсум', height: 7570,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/GangkharPuensum3.jpg/60px-GangkharPuensum3.jpg'
    },
    {
        name: 'Гунгашань', height: 7556,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Gonggashan.jpg/60px-Gonggashan.jpg'
    },
    {
        name: 'Аннапурна III', height: 7555,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Annapurna_I.jpg/60px-Annapurna_I.jpg'
    },
    {
        name: 'Музтагата', height: 7546,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Karakul-muztagh-ata-d13.jpg/60px-Karakul-muztagh-ata-d13.jpg'
    },
    {
        name: 'Скьянг-Кангри', height: 7545,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Skyang_Kangri.jpg/60px-Skyang_Kangri.jpg'
    },
    {
        name: 'Чангзе', height: 7543,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Changtse-from-KalaPattar.jpg/60px-Changtse-from-KalaPattar.jpg'
    },
    {
        name: 'Сингхи-Кангри', height: 7202,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Karakoram_location_map.png/2560px-Karakoram_location_map.png'
    },
    {
        name: 'Лхоцзе', height: 8516,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/LhotseMountain.jos.500pix.jpg/60px-LhotseMountain.jos.500pix.jpg'
    },
    {
        name: 'Мамостонг-Кангри', height: 7516,
        img: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/India_relief_location_map.jpg'
    },
    {
        name: 'Сасер-Кангри II', height: 7513,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Saser_Kangri_III_and_II.jpg/60px-Saser_Kangri_III_and_II.jpg'
    },
    {
        name: 'Пик Исмоила Сомони', height: 7495,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/USSR-Tajikistan-Peak_Communism.jpg/60px-USSR-Tajikistan-Peak_Communism.jpg'
    },
    {
        name: 'Сасер-Кангри III', height: 7495,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Saser_Kangri_III_and_II.jpg/60px-Saser_Kangri_III_and_II.jpg'
    },
    {
        name: 'Ношак', height: 7492,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Noszak.jpg/60px-Noszak.jpg'
    },
    {
        name: 'Пумари-Киш', height: 7492,
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Kunyang_Pumari_Chhish.JPG'
    },
    {
        name: 'Пасу-Сар', height: 7476,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Pasu_glacier.jpg/60px-Pasu_glacier.jpg'
    },
    {
        name: 'Юкшин-Гардан-Сар', height: 7469,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kanjut_Sar.jpg/1920px-Kanjut_Sar.jpg'
    },
    {
        name: 'Терам Кангри I', height: 7462,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Karakoram_location_map.png/2560px-Karakoram_location_map.png'
    },
    {
        name: 'Джонгсонг', height: 7462,
        img: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Nepal_relief_location_map.jpg'
    },
    {
        name: 'Малубитинг', height: 7458,
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Malubiting_summits.png'
    },
    {
        name: 'Гангапурна', height: 7455,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Gangapurna.JPG/60px-Gangapurna.JPG'
    },
    {
        name: 'Пик Победы', height: 7439,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Peak_Pobeda2.jpg/60px-Peak_Pobeda2.jpg'
    },
    {
        name: 'К12', height: 7428,
        img: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Pakistan_relief_location_map.jpg'
    },
    {
        name: 'Янгра(Ганеш I)', height: 7422,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Langtang_range_%2825%29.JPG/2560px-Langtang_range_%2825%29.JPG'
    },
    {
        name: 'Sia Kangri', height: 7422,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Gasherbrum_group_summits_and_glaciers_marked.jpg/2560px-Gasherbrum_group_summits_and_glaciers_marked.jpg'
    },
    {
        name: 'Момхиль-Шар', height: 7414,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sleeping_Beauty_in_Hunza.JPG/2560px-Sleeping_Beauty_in_Hunza.JPG'
    },
    { name: 'Kabru N', height: 7412 },
    { name: 'Скил-Брум', height: 7410 },
    { name: 'Харамош', height: 7409 },
    { name: 'Istor-o-Nal', height: 7403 },
    { name: 'Ghent Kangri', height: 7401 },
    { name: 'Ултар', height: 7388 },
    { name: 'Римо I', height: 7385 },
    { name: 'Churen Himal', height: 7385 },
    { name: 'Терам Кангри III', height: 7382 },
    { name: 'Sherpi Kangri', height: 7380 },
    { name: 'Labuche Kang', height: 7367 },
    { name: 'Кират-Чули', height: 7362 },
    { name: 'Abi Gamin', height: 7355 },
    { name: 'Mana', height: 7272 },
    { name: 'Дхаулагири VI', height: 7268 },
    { name: 'Diran', height: 7266 },
    { name: 'Labuche Kang III / East', height: 7250 },
    { name: 'Putha Hiunchuli', height: 7246 },
    { name: 'Apsarasas Kangri', height: 7245 },
    { name: 'Mukut Parbat', height: 7242 },
    { name: 'Rimo III', height: 7233 },
    { name: 'Langtang Lirung', height: 7227 },
    { name: 'Карджианг', height: 7221 },
    { name: 'Аннапурна Южная', height: 7219 },
    { name: 'Кхартапху', height: 7213 },
    { name: 'Тонгшанджиабу', height: 7207 },
    { name: 'Malangutti Sar', height: 7207 },
    { name: 'Ноценкансари', height: 7206 },
    {
        name: 'Лангтанг-Ри', height: 7205,
        img: 'https://de.wikipedia.org/wiki/Langtang_Ri#/media/File:ShishapangmaandGangBenchen.jpg'
    },
    {
        name: 'Кангпху-Канг', height: 7204,
        img: 'https://c1.staticflickr.com/8/7547/15757746636_53da7ab540_b.jpg'
    },
    {
        name: 'Чогори', height: 8611,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/K2_2006b.jpg/60px-K2_2006b.jpg'
    },
    {
        name: 'Джомолунгма', height: 8848,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/IMG_2124_Everest.jpg/60px-IMG_2124_Everest.jpg'
    }
].sort((a, b) => a.height - b.height)

export default class GrowlCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\/(ор)(?: |$)/im

    public help(): IBotCommandHelp {
        return { caption: '/ор', description: 'Показывает уровень ора.' }
    }

    public init(bot: IBot): void { }

    public test(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    public async run(msg: string, answer: IBotMessage): Promise<void> {
        const id = getRandomInt(0, MOUNTAINS.length)
        const low = id > 0 ? MOUNTAINS[id - 1] : undefined
        const hi = id < MOUNTAINS.length - 1 ? MOUNTAINS[id + 1] : undefined
        if (!hi) {
            if (low && low.img) {
                answer.setImage(low.img)
            }
            answer.setDescription('Ваш ор выше всех гор!')
            return
        }
        if (hi && hi.img) {
            answer.setImage(hi.img)
        }
        if (!low) {
            answer.setDescription('Ваш ор ниже всех гор!')
            return
        }
        answer.setDescription(`Ваш ор выше "${low.name}" (${low.height}м) и ниже "${hi.name}" (${hi.height}м)!`)
    }
}