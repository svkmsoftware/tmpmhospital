/**
 * GraphQL Queries — TMPM Hospital CMS (Unified)
 * ─────────────────────────────────────────────────────────────────────────────
 * Every query string used anywhere in this project lives in this one file.
 * There is no separate "about" query file — About is just one more query
 * among the rest, exactly like every other page.
 *
 * LEARNING: GraphQL Query Anatomy
 * ────────────────────────────────
 *  query AboutPage {          ← "query" keyword + optional name (good practice)
 *    about {                  ← the "resolver" — matches the endpoint in Strapi
 *      About_banner { url }   ← a field, then a sub-field
 *      section {              ← a Dynamic Zone (array of different types)
 *        __typename           ← ALWAYS request this on unions — it's the discriminator
 *        ... on ComponentX { heading }  ← "inline fragment" — only applies when __typename = ComponentX
 *      }
 *    }
 *  }
 *
 * LEARNING: Inline Fragments (... on Type)
 * ─────────────────────────────────────────
 * Because `section` can be many different types (a Union), you can't just
 * say "give me heading" — the server needs to know WHICH type's heading.
 * Inline fragments solve this:
 *   ... on ComponentSharedAboutSection { heading }
 * means: "IF this section IS a ComponentSharedAboutSection, THEN give me heading"
 *
 * LEARNING: Parameterized Queries with Variables
 * ───────────────────────────────────────────────
 * When you need to pass a dynamic value (e.g. a slug), use GraphQL
 * variables instead of string interpolation:
 *
 *   BAD  (injection risk):  query { departments(filters: { slug: { eq: "${input}" } }) { ... } }
 *   GOOD (variables):       query Get($slug: String!) { departments(filters: { slug: { eq: $slug } }) { ... } }
 *                           variables: { slug: input }
 *
 * KEY SCHEMA FINDINGS (from allQuery.txt introspection):
 * ─────────────────────────────────────────────────────────
 * • Consultant: profile_image, name, designation, view_profile, book_appointment, departments[]
 * • Department: banner, general_medicine (always this field name, regardless of dept), consultant_section, consultants[], department_categories[]
 * • Contact-style pages (Opd/Ipd/Daycare) all link to Contact.Contact_section
 * • Career.why_work_with_us is a DynamicZone containing ComponentSharedWhyChooseUs
 * • Blog: blogs[] (ComponentSharedBlog[]) — each has heading, subheading, featured_image
 * • BlogPage: heading_section + a single Blog reference
 * • Docter (typo in the CMS) = the doctors LISTING page: Banner, Docters (heading), department_category
 *
 * NOTE (pagination update): the old standalone `GET_CONSULTANTS_QUERY`
 * (top-level `consultants { ... }`, no pagination) has been removed —
 * doctor data now comes exclusively from `GET_DOCTOR_PAGE_QUERY` below,
 * which nests `consultants` under `docter` and supports page/pageSize.
 */

// ── About Page ─────────────────────────────────────────────────────────────
export const ABOUT_PAGE_QUERY = /* GraphQL */ `
  query AboutPage {
    about {
      About_banner {
        url
        alternativeText
        width
        height
      }
      section {
        __typename

        ... on ComponentSharedAboutSection {
          heading
          subheading
          description
          featured_image {
            url
            alternativeText
            width
            height
          }
          featured_video {
            url
          }
          features_details {
            heading
            value
          }
        }

        ... on ComponentSharedVision {
          heading
          descriptions
        }

        ... on ComponentSharedPresident {
          heading
          subheading
          President_details {
            position
            name
            description
            featured_image {
              url
              alternativeText
            }
          }
        }

        ... on ComponentSharedOurTrustees {
          heading
          subheading
          description
          trustee_details {
            name
            position
            featured_image {
              url
              alternativeText
            }
          }
        }

        ... on ComponentSharedManagementTeam {
          heading
          subheading
          management_details {
            name
            position
            description
            featured_image {
              url
              alternativeText
            }
            social_icon {
              icon {
                url
              }
            }
          }
        }

        ... on ComponentSharedWhyChooseUs {
          heading
          subheading
          why_choose_details {
            heading
            subheading
            featured_image {
              url
              alternativeText
            }
          }
        }

        ... on ComponentSharedGallery {
          heading
          subheading
          gallery_section {
            Image {
              url
              alternativeText
              width
              height
            }
          }
        }

        ... on ComponentSharedContact {
          heading
          subheading
          contact_detail {
            heading
            description
          }
        }
      }
    }
  }
`;

// ── Home Page ───────────────────────────────────────────────────────────────
// NOTE: Several field names below contain the vendor's own typos
// (Abour_US, News_hwading) and inconsistent capitalisation (Heading vs
// heading). These are copied EXACTLY as the CMS schema defines them —
// GraphQL field names are literal; we cannot "fix" the vendor's spelling
// without breaking the query.
export const GET_HOME_PAGE_QUERY = /* GraphQL */ `
  query GetHomePage {
  home {
    Banner {
      url
      name
      alternativeText
    }

    Mobile_banner {
    url
    name
    alternativeText
    }

    Abour_US {
      heading
      subheading
      description

      featured_image {
        url
        name
        alternativeText
      }

      featured_video {
        url
        name
      }

      features_details {
        heading
        value
      }

      features {
        Heading
        value

        icon {
          url
          name
          alternativeText
        }
      }
    }

    WhySVKM {
      heading
      Subheading
      content

      Why_vkm {
        heading
        value
      }
    }

    docters_advice {
      heading
      subheading

      docters_advice_section {
        advice_video {
          url
          name
          alternativeText
        }

        department_category {
          documentId
          name
          slug
        }
      }
    }

    health_insight {
      heading
      subheading

      blogs {
        documentId
        heading
        subheading

        featured_image {
          url
          name
          alternativeText
        }
      }
    }

    Testimonial_section {
      heading
      subheading
      content

      testimonials {
        documentId
        Author_name
        message
        Department
      }
    }

    faq_section {
      heading
      subheading
      content

      details {
        heading
        value
      }

      faq_details {
        Question
        Answer
      }
    }

    our_facilities {
      heading
      subheading

      gallery {
        heading

        image {
          url
          name
          alternativeText
        }
      }
    }

    Department_heading {
      heading
      subheading
    }

    departments {
      documentId

      banner {
        url
        name
        alternativeText
      }

      general_medicine {
        heading
        subheading
      }

      consultant_section {
        heading
        subheading
      }

      Blog_Section {
        heading
        subheading
      }

      createdAt
      updatedAt
      publishedAt
    }

    News_hwading {
      heading
      subheading
    }

    News {
      Heading
      content

      featured_image {
        url
        name
        alternativeText
      }
    }

    Blog_heading {
      heading
      subheading
    }

    blog {
      heading
      subheading

      featured_image {
        url
        name
        alternativeText
      }
    }
  }
}
`;

// ── Doctors — combined banner + heading + paginated consultants list ──────
// Used by both the homepage doctors slider (page: 1, small pageSize) and
// the full /doctors listing page (page: N, pageSize: 10).
export const GET_DOCTOR_PAGE_QUERY = /* GraphQL */ `
  query GetDoctorPage($page: Int, $pageSize: Int) {
    docter {
      Banner {
        url
        alternativeText
      }
      Docters {
        heading
        subheading
      }
      consultants(pagination: { page: $page, pageSize: $pageSize }) {
        documentId
        name
        designation
        view_profile
        book_appointment
        profile_image {
          url
          alternativeText
        }
        departments {
          documentId
          department_categories {
            name
            slug
          }
        }
      }
    }
  }
`;

// ── Docter page (banner + section heading for doctors page) ────────────────
export const GET_DOCTER_PAGE_QUERY = /* GraphQL */ `
  query GetDocterPage {
    docter {
      Banner {
        url
        alternativeText
      }
      Docters {
        heading
        subheading
      }
      department_category {
        name
        slug
      }
    }
  }
`;

// ── Department Categories ───────────────────────────────────────────────────
export const GET_DEPARTMENT_CATEGORIES_QUERY = /* GraphQL */ `
  query GetDepartmentCategories {
    departmentCategories {
      documentId
      name
      slug
      description
    }
  }
`;

// ── Department Page (banner + category nav) ────────────────────────────────
export const GET_DEPARTMENT_PAGE_QUERY = /* GraphQL */ `
  query GetDepartmentPage {
    departmentPage {
      Department_section {
        Banner {
          url
          alternativeText
        }
        Department_cat_section {
          heading
          subheading
          Department_cat {
            department_categories {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

// ── Department by slug (detail page) ───────────────────────────────────────
// NOTE: The CMS filters departments via department_categories.slug.
// The content field is always named "general_medicine" regardless of the
// actual department — that is how the vendor's CMS schema is structured.
export const GET_DEPARTMENT_BY_SLUG_QUERY = /* GraphQL */ `
  query GetDepartmentBySlug($slug: String!) {
    departments(
      filters: {
        department_categories: {
          slug: { eq: $slug }
        }
      }
    ) {
      documentId
      banner {
        url
        alternativeText
      }
      general_medicine {
        heading
        subheading
        why_choose_details {
          heading
          subheading
          featured_image {
            url
            alternativeText
          }
        }
      }
      consultant_section {
        heading
        subheading
      }
      consultants {
        documentId
        name
        designation
        view_profile
        book_appointment
        profile_image {
          url
          alternativeText
        }
      }
      department_categories {
        name
        slug
      }
    }
  }
`;

// ── Blog Page ───────────────────────────────────────────────────────────────
// BlogPage.blogs → Blog type → Blog.blogs[] → ComponentSharedBlog[]
export const GET_BLOG_PAGE_QUERY = /* GraphQL */ `
  query GetBlogPage {
    blogPage {
      heading_section {
        heading
        subheading
      }
      blogs {
        documentId
        blogs {
          heading
          subheading
          featured_image {
            url
            alternativeText
          }
        }
      }
    }
  }
`;

// ── Blogs collection (all blog entries) ────────────────────────────────────
export const GET_BLOGS_QUERY = /* GraphQL */ `
  query GetBlogs {
    blogs {
      documentId
      blogs {
        heading
        subheading
        featured_image {
          url
          alternativeText
        }
      }
    }
  }
`;

// ── Career Page ─────────────────────────────────────────────────────────────
export const GET_CAREER_PAGE_QUERY = /* GraphQL */ `
  query GetCareerPage {
    career {
      Banner {
        heading
        subheading
      }
      why_work_with_us {
        __typename
        ... on ComponentSharedWhyChooseUs {
          heading
          subheading
          why_choose_details {
            heading
            subheading
            featured_image {
              url
              alternativeText
            }
          }
        }
      }
      current_openings {
        heading
        subheading
        current_opening_details {
          heading
          details
          apply_now
        }
      }
      banner_image {
        url
        alternativeText
      }
    }
  }
`;

// ── Contact Page ────────────────────────────────────────────────────────────
export const GET_CONTACT_PAGE_QUERY = /* GraphQL */ `
  query GetContactPage {
    contactPage {
      heading {
        heading
        subheading
      }
      contact {
        documentId
        Contact_section {
          heading
          subheading
          contact_detail {
            heading
            description
          }
          Contact_form {
            name
            email
            subject
            message
          }
        }
      }
    }
  }
`;

// ── OPD Page ────────────────────────────────────────────────────────────────
export const GET_OPD_PAGE_QUERY = /* GraphQL */ `
  query GetOPDPage {
    opd {
      opd_banner {
        url
        alternativeText
      }
      outpatient_department {
        heading
        subheading
        why_choose_details {
          heading
          subheading
          featured_image {
            url
          }
        }
      }
      Opd_contact_form {
        documentId
        Contact_section {
          heading
          subheading
          contact_detail {
            heading
            description
          }
        }
      }
    }
  }
`;

// ── IPD Page ────────────────────────────────────────────────────────────────
export const GET_IPD_PAGE_QUERY = /* GraphQL */ `
  query GetIPDPage {
    ipd {
      ipd_banner {
        url
        alternativeText
      }
      Inpatient_department {
        heading
        subheading
        why_choose_details {
          heading
          subheading
          featured_image {
            url
          }
        }
      }
      Contacts {
        documentId
        Contact_section {
          heading
          subheading
          contact_detail {
            heading
            description
          }
        }
      }
    }
  }
`;

// ── Day Care Page ───────────────────────────────────────────────────────────
export const GET_DAYCARE_PAGE_QUERY = /* GraphQL */ `
  query GetDaycarePage {
    daycare {
      daycare_banner {
        url
        alternativeText
      }
      day_care {
        heading
        subheading
        why_choose_details {
          heading
          subheading
          featured_image {
            url
          }
        }
      }
      contact {
        documentId
        Contact_section {
          heading
          subheading
          contact_detail {
            heading
            description
          }
        }
      }
    }
  }
`;