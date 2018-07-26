import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import qs from "qs"
import hex2rgba from "hex2rgba"
import { style } from "glamor"

import { options, scale, rhythm } from "../../utils/typography"
import presets, { colors } from "../../utils/presets"

import GithubIcon from "../../assets/showcase-github.svg"

const ShowcaseList = ({ items, count }) => {
  if (count) items = items.slice(0, count)

  return (
    <div
      css={{
        ...styles.showcaseList,
      }}
    >
      {items.map(
        ({ node }) =>
          node.fields &&
          node.fields.slug && ( // have to filter out null fields from bad data
            <div
              key={node.id}
              css={{
                ...styles.showcaseItem,
              }}
            >
              <Link
                to={{ pathname: node.fields.slug, state: { isModal: true } }}
                {...styles.withTitleHover}
                css={{
                  "&&": {
                    borderBottom: `none`,
                    boxShadow: `none`,
                    transition: `all ${presets.animation.speedDefault} ${
                      presets.animation.curveDefault
                    }`,
                    "&:hover": {
                      ...styles.screenshotHover,
                    },
                  },
                }}
              >
                {node.childScreenshot ? (
                  <Img
                    resolutions={
                      node.childScreenshot.screenshotFile.childImageSharp
                        .resolutions
                    }
                    alt={`Screenshot of ${node.title}`}
                    css={{
                      ...styles.screenshot,
                    }}
                  />
                ) : (
                  <div
                    css={{
                      width: 320,
                      backgroundColor: `#d999e7`,
                    }}
                  >
                    missing
                  </div>
                )}
                <div>
                  <span className="title">{node.title}</span>
                </div>
              </Link>
              <div
                css={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  "&&": {
                    color: `#9B9B9B`,
                  },
                }}
              >
                <div>
                  {node.categories.map((c, i) => (
                    <React.Fragment key={c}>
                      <Link
                        css={{
                          "&&": {
                            ...styles.categoryLink,
                          },
                        }}
                        to={`/showcase?${qs.stringify({ filters: [c] })}`}
                      >
                        {c}
                      </Link>

                      {i === node.categories.length - 1 ? `` : `, `}
                    </React.Fragment>
                  ))}
                </div>
                {node.source_url && (
                  <div>
                    <a
                      css={{
                        "&&": {
                          ...styles.categoryLink,
                        },
                      }}
                      href={node.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={GithubIcon}
                        alt="icon"
                        css={{
                          margin: 6,
                        }}
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )
      )}
    </div>
  )
}

export default ShowcaseList

const styles = {
  withTitleHover: style({
    "& .title": {
      transition: `box-shadow .3s cubic-bezier(.4,0,.2,1), transform .3s cubic-bezier(.4,0,.2,1)`,
      boxShadow: `inset 0 0px 0px 0px ${colors.ui.whisper}`,
    },
    "&:hover .title": {
      boxShadow: `inset 0 -3px 0px 0px ${colors.ui.bright}`,
    },
  }),
  screenshot: {
    borderRadius: presets.radius,
    boxShadow: `0 4px 10px ${hex2rgba(colors.gatsby, 0.1)}`,
    marginBottom: rhythm(options.blockMarginBottom / 2),
    transition: `all ${presets.animation.speedDefault} ${
      presets.animation.curveDefault
    }`,
  },
  screenshotHover: {
    background: `transparent`,
    color: colors.gatsby,
    "& .gatsby-image-wrapper": {
      transform: `translateY(-3px)`,
      boxShadow: `0 8px 20px ${hex2rgba(colors.lilac, 0.5)}`,
    },
  },
  categoryLink: {
    ...scale(-2 / 5),
    fontWeight: `normal`,
    borderBottom: `none`,
    boxShadow: `none`,
    "&:hover": {
      background: `none`,
      color: colors.gatsby,
    },
  },
  showcaseList: {
    display: `flex`,
    flexWrap: `wrap`,
    padding: rhythm(3 / 4),
    justifyContent: `center`,
    [presets.Desktop]: {
      justifyContent: `flex-start`,
    },
  },
  showcaseItem: {
    display: `flex`,
    flexDirection: `column`,
    margin: rhythm(3 / 4),
    width: 280,
  },
}
