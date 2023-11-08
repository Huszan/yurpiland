import MapIco from '../resources/images/icons/map-icon.png'
import AdventurerIco from '../resources/images/icons/adventurer-icon.png'
import GuildIco from '../resources/images/icons/guild-icon.png'
import StaffIco from '../resources/images/icons/staff-icon.png'
import AlchemyIco from '../resources/images/icons/alchemy-icon.png'
import AchievementsIco from '../resources/images/icons/achievements-icon.png'
import SettingsIco from '../resources/images/icons/settings-icon.png'

const routes = [
    {
        key: "Map",
        path: "/map",
        icon: MapIco,
    },
    {
        key: "adventurers",
        path: "/adventurers",
        icon: AdventurerIco,
    },
    {
        key: "guild",
        path: "/guild",
        icon: GuildIco,
    },
    {
        key: "staff",
        path: "/staff",
        icon: StaffIco,
    },
    {
        key: "alchemy",
        path: "/alchemy",
        icon: AlchemyIco,
    },
    {
        key: "achievements",
        path: "/achievements",
        icon: AchievementsIco,
    },
    {
        key: "settings",
        path: "/settings",
        icon: SettingsIco,
    },
]

export { routes } 