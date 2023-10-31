import {useEffect} from "react";
import {useSetState} from "react-use";

export interface UseRssProps {
    url: string;
}

export interface UseRssState {
    loading: boolean;
    data: any;
    error: Error;
}

export function parseFeed(feed: Document) {
    return Array.from(feed.querySelectorAll('entry')).map(i => {
        return {
            title: i.querySelector('summary')?.childNodes[0].textContent as string,
            description: i
                .querySelector('content')
                ?.childNodes[0].textContent?.replace(/<[^>]*>?/gm, '') as string,
            link: i.querySelector('id')?.innerHTML as string,
            date: new Date(i.querySelector('updated')?.innerHTML ?? ''),
        };
    });
}

const useRss = (props: UseRssProps) => {
    const [state, setState] = useSetState<UseRssState>({
        loading: true,
        data: null,
        error: null
    })
    useEffect(() => {
        if (!props?.url) {
            return setState({
                error: Error("没有传入Rss Url!")
            })
        }

        fetch(props.url)
            .then(res => res.text())
            .then(xml => {
                const data = new window.DOMParser().parseFromString(xml, 'text/xml');
                console.log((data), 'data')
                console.log(parseFeed(data), 'data')
                // setState({
                //     data: parseFeed(data)
                // })
            })
            .catch((err) => {
                setState({
                    error: Error(err)
                })
            })
            .finally(() => {
                setState({
                    loading: false
                })
            })

    }, [])

    return {
        ...state
    }
}

export default useRss;
