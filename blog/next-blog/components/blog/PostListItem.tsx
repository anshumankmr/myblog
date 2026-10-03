import Link from "next/link"

type PostListItemProps = {
  title: string
  date: string
  dateTime?: string
  excerpt: string
  href: string
  last?: boolean
}

export function PostListItem({
  title,
  date,
  dateTime,
  excerpt,
  href,
  last = false,
}: PostListItemProps) {
  return (
    <li className={last ? "" : "border-b border-border-hairline"}>
      <Link href={href} className="post-row">
        <div className="post-row-heading">
          <h2 className="post-title">{title}</h2>
          <time dateTime={dateTime} className="meta post-date">
            {date}
          </time>
        </div>
        <p className="post-excerpt">{excerpt}</p>
      </Link>
    </li>
  )
}
