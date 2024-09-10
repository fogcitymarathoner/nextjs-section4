import NewsList from "@/components/news-list";
import {getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth} from "@/lib/news";
import Link from "next/link";
import {Suspense} from "react";


async function FilteredNews({year, month}) {
    let news
    if (year && !month) {
        news = await getNewsForYear(year);
    } else if (year && month) {
        news = await getNewsForYearAndMonth(year, month);
    }
    let newsContent = <p>No news found for selected period.</p>
    if (news && news.length > 0) {
        newsContent = <NewsList news={news}/>
    }
    return newsContent
}

export default async function FilteredNewsPage({params}) {
    const filter = params.filter;
    const selectedYear = filter?.[0]
    const selectedMonth = filter?.[1]
    const availableYears = await getAvailableNewsYears()
    let links = availableYears
    if (selectedYear && !selectedMonth) {
        links = await getAvailableNewsMonths(selectedYear);
    }
    if (selectedYear && selectedMonth) {
        links = []
    }
    const selectYearMonths = await getAvailableNewsMonths(selectedYear)
    if (selectedYear && !availableYears.includes(selectedYear) ||
        selectedMonth && !selectYearMonths.includes(selectedMonth)) {
        throw new Error('Invalid filter.')
    }
    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                       {links.map(link => {
                            const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`
                            return (
                                <li key={link}>
                                    <Link href={href}>{link}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </header>
            <Suspense fallback={<p>Loading news ...</p>}>
                <FilteredNews year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    )
}