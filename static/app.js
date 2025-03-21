document.addEventListener('DOMContentLoaded', function() {
    loadPage('home');
});

function loadPage(page) {
    const contentElement = document.getElementById('content');
    contentElement.className = ''; // Сброс всех классов

    if (page === 'home') {
        fetch('/news')
            .then(response => response.json())
            .then(newsList => {
                let content = '<h2 class="news-title">Последние новости</h2>';
                newsList.forEach(news => {
                    content += `
                        <div class="news-item">
                            <h3 class="news-subtitle">${news.title}</h3>
                            <p class="news-content">${news.content}</p>
                            ${news.image ? `<img class="news-image" src="static/uploads/${news.image}" alt="${news.title}" />` : ''}
                        </div>
                    `;
                });
                contentElement.innerHTML = content;
                contentElement.classList.add('home-page'); // Применение стилей для главной страницы
            })
            .catch(error => {
                console.error('Ошибка при загрузке новостей:', error);
            });
    }

    if (page === 'teams') {
        fetch('/teams')
            .then(response => response.json())
            .then(teamsList => {
                let content = '<h2>Список команд</h2><div class="teams-grid">';
                teamsList.forEach(team => {
                    content += `
                        <div class="team-card">
                            <img src="${team.logo}" alt="${team.name} логотип" class="team-logo" />
                            <div class="team-info">
                                <h4 class="team-name">${team.name}</h4>
                                <p class="team-description">${team.description || 'Описание отсутствует'}</p>
                            </div>
                        </div>
                    `;
                });
                content += '</div>';
                contentElement.innerHTML = content;
                contentElement.classList.add('teams-page');
            })
            .catch(error => {
                console.error('Ошибка при загрузке команд:', error);
            });
    }

    if (page === 'players') {
           const playersList = [
    {
        name: "Абдуллаев Максим",
        team: "ХК Сочи (Сочи)",
        position: "вратарь",
        birthDate: "13 марта 2005",
        age: 20,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "https://img.khl.ru/players/41411/160.jpg" // Замените на реальный путь к фото
    },
    {
        name: "Абдуллин Эмиль",
        team: "Лада (Тольятти)",
        position: "вратарь",
        birthDate: "15 августа 2005",
        age: 19,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "https://img.khl.ru/players/42689/160.jpg"
    },
    {
        name: "Абрамов Виталий",
        team: "ЦСКА (Москва)",
        position: "нападающий",
        birthDate: "8 мая 1998",
        age: 26,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2027",
        photo: "https://img.khl.ru/players/23248/160.jpg"
    },
    {
        name: "Абрамов Михаил Б.",
        team: "Торпедо (Нижний Новгород)",
        position: "нападающий",
        birthDate: "26 марта 2001",
        age: 23,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "https://img.khl.ru/players/30941/160.jpg"
    },
    {
        name: "Абросимов Роман",
        team: "Нефтехимик (Нижнекамск)",
        position: "защитник",
        birthDate: "31 июля 1994",
        age: 30,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "https://img.khl.ru/players/17968/160.jpg"
    },
    {
        name: "Абросимов Руслан",
        team: "Северсталь (Череповец)",
        position: "нападающий",
        birthDate: "15 мая 2001",
        age: 23,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "https://img.khl.ru/players/30629/160.jpg"
    },
    {
        name: "Авершин Данил",
        team: "ХК Сочи (Сочи)",
        position: "нападающий",
        birthDate: "10 марта 2002",
        age: 23,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "https://img.khl.ru/players/33644/160.jpg"
    },
    {
        name: "Аврамов Фёдор",
        team: "ХК Сочи (Сочи)",
        position: "нападающий",
        birthDate: "19 ноября 2005",
        age: 19,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "https://img.khl.ru/players/41562/160.jpg"
    },
    {
        name: "Адамчук Кирилл",
        team: "Динамо М (Москва)",
        position: "защитник",
        birthDate: "24 мая 1994",
        age: 30,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "https://img.khl.ru/players/18961/160.jpg"
    },
    {
        name: "Аймурзин Данил",
        team: "Северсталь (Череповец)",
        position: "нападающий",
        birthDate: "17 апреля 2002",
        age: 22,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "https://img.khl.ru/players/35353/160.jpg"
    },
    {
        name: "Акмальдинов Рауль",
        team: "Локомотив (Ярославль)",
        position: "защитник",
        birthDate: "19 июня 2002",
        age: 22,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "https://img.khl.ru/players/33710/160.jpg"
    },
    {
        name: "Акользин Павел",
        team: "СКА (Санкт-Петербург), Металлург (Магнитогорск)",
        position: "нападающий",
        birthDate: "25 ноября 1990",
        age: 34,
        nationality: "Россия",
        nationalTeam: "Казахстан",
        contractUntil: "31.05.2026",
        photo: "https://img.khl.ru/players/15620/160.jpg"
    },
    {
        name: "Алалыкин Данил",
        team: "Салават Юлаев (Уфа)",
        position: "нападающий",
        birthDate: "27 марта 2001",age: 23,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "https://img.khl.ru/players/34493/160.jpg"
    },
    {
        name: "Аланов Егор",
        team: "Сибирь (Новосибирская область)",
        position: "защитник",
        birthDate: "16 декабря 2000",
        age: 24,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "https://img.khl.ru/players/26698/160.jpg"
    },
    {
        name: "Алексеев Денис В.",
        team: "Локомотив (Ярославль)",
        position: "нападающий",
        birthDate: "1 октября 1997",
        age: 27,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "https://img.khl.ru/players/21886/160.jpg"
    },
    {
        name: "Алексеев Егор Ал.",
        team: "Автомобилист (Екатеринбург)",
        position: "нападающий",
        birthDate: "7 марта 2000",
        age: 25,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "https://img.khl.ru/players/25813/160.jpg"
    },
    {
        name: "Аликин Евгений",
        team: "Автомобилист (Екатеринбург)",
        position: "вратарь",
        birthDate: "18 октября 1994",
        age: 30,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "https://img.khl.ru/players/18488/160.jpg"
    },
    {
        name: "Алистров Владимир",
        team: "СКА (Санкт-Петербург)",
        position: "нападающий",
        birthDate: "12 февраля 2001",
        age: 24,
        nationality: "Беларусь",
        nationalTeam: "Беларусь",
        contractUntil: "31.05.2027",
        photo: "https://img.khl.ru/players/34802/160.jpg"
    },
    {
        name: "Алмазов Никита",
        team: "Витязь (Московская область)",
        position: "нападающий",
        birthDate: "9 апреля 2004",
        age: 20,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "https://img.khl.ru/players/40180/160.jpg"
    },
    {
        name: "Алтыбармакян Андрей",
        team: "Лада (Тольятти)",
        position: "нападающий",
        birthDate: "4 августа 1998",
        age: 26,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "path/to/photo20.jpg"
    },
    {
        name: "Андреофф Энди",
        team: "Сибирь (Новосибирская область)",
        position: "нападающий",
        birthDate: "17 мая 1991",
        age: 33,
        nationality: "Канада",
        nationalTeam: "Канада",
        contractUntil: "30.04.2025",
        photo: "path/to/photo21.jpg"
    },
    {
        name: "Андреянов Пётр",
        team: "ЦСКА (Москва)",
        position: "вратарь",
        birthDate: "22 января 2007",
        age: 18,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2027",
        photo: "path/to/photo22.jpg"
    },
    {
        name: "Андронов Сергей",
        team: "СКА (Санкт-Петербург)",
        position: "нападающий",
        birthDate: "19 июля 1989",
        age: 35,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "path/to/photo23.jpg"
    },
    {
        name: "Аноховский Никита",
        team: "Адмирал (Владивосток)",
        position: "нападающий",
        birthDate: "22 марта 1999",
        age: 25,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "path/to/photo24.jpg"
    },
    {
        name: "Антипин Виктор",
        team: "Барыс (Астана)",
        position: "защитник",
        birthDate: "6 декабря 1992",
        age: 32,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "path/to/photo25.jpg"
    },
    {
        name: "Ануфриев Илья",
        team: "Витязь (Московская область)",
        position: "нападающий",
        birthDate: "13 августа 2003",
        age: 21,
        nationality: "Россия",
        nationalTeam: "Россия",contractUntil: "31.05.2025",
        photo: "path/to/photo26.jpg"
    },
    {
        name: "Апальков Даниил",
        team: "Барыс (Астана)",
        position: "нападающий",
        birthDate: "1 января 1992",
        age: 33,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "",
        photo: "path/to/photo27.jpg"
    },
    {
        name: "Арефьев Максим",
        team: "Ак Барс (Казань)",
        position: "вратарь",
        birthDate: "11 июня 2003",
        age: 21,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "path/to/photo28.jpg"
    },
    {
        name: "Аркалов Илья",
        team: "Витязь (Московская область)",
        position: "нападающий",
        birthDate: "27 октября 1993",
        age: 31,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2025",
        photo: "path/to/photo29.jpg"
    },
    {
        name: "Артамонов Никита",
        team: "Торпедо (Нижний Новгород)",
        position: "нападающий",
        birthDate: "17 ноября 2005",
        age: 19,
        nationality: "Россия",
        nationalTeam: "Россия",
        contractUntil: "31.05.2026",
        photo: "path/to/photo30.jpg"
    }
];

        let content = '<h2>Список игроков</h2><div class="players-grid">';
        playersList.forEach(player => {
            let content = '<h2>Список игроков</h2><div class="players-grid">';
            playersList.forEach(player => {
                content += `
                <div class="player-card">
                    <img src="${player.photo}" alt="${player.name} фотография" class="player-photo" />
                    <div class="player-info">
                        <h4 class="player-name">${player.name}</h4>
                        <table class="player-details">
                            <tr>
                                <th>Клуб</th>
                                <td>${player.team}</td>
                            </tr>
                            <tr>
                                <th>Амплуа</th>
                                <td>${player.position}</td>
                            </tr>
                            <tr>
                                <th>Дата рождения</th>
                                <td>${player.birthDate}</td>
                            </tr>
                            <tr>
                                <th>Возраст</th>
                                <td>${player.age}</td>
                            </tr>
                            <tr>
                                <th>Гражданство</th>
                                <td>${player.nationality}</td>
                            </tr>
                            <tr>
                                <th>Сборная</th>
                                <td>${player.nationalTeam}</td>
                            </tr>
                            <tr>
                                <th>Контракт до</th>
                                <td>${player.contractUntil || 'Нет'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `;
            });
            content += '</div>';

            contentElement.innerHTML = content;
            contentElement.classList.add('players-page');
        })
}
}
