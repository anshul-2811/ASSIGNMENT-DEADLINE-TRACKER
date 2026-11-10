import { useMemo, useState } from "react";

type Status = "In progress" | "Not started" | "Completed";
type Priority = "High" | "Medium" | "Low";

type Assignment = {
  id: number;
  title: string;
  subject: string;
  code: string;
  due: string;
  dueLabel: string;
  status: Status;
  priority: Priority;
  progress: number;
};

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Data Structures Lab Report",
    subject: "Data Structures",
    code: "CS201",
    due: "2026-11-20",
    dueLabel: "Today, 11:59 PM",
    status: "In progress",
    priority: "High",
    progress: 70,
  },
  {
    id: 2,
    title: "Cloud Architecture Case Study",
    subject: "Cloud Computing",
    code: "CS305",
    due: "2026-11-22",
    dueLabel: "22 Nov, 11:59 PM",
    status: "Not started",
    priority: "High",
    progress: 0,
  },
  {
    id: 3,
    title: "Java Swing Mini Project",
    subject: "Java Programming",
    code: "CS202",
    due: "2026-11-24",
    dueLabel: "24 Nov, 6:00 PM",
    status: "In progress",
    priority: "Medium",
    progress: 45,
  },
  {
    id: 4,
    title: "Discrete Mathematics Worksheet",
    subject: "Discrete Mathematics",
    code: "MA203",
    due: "2026-11-28",
    dueLabel: "28 Nov, 10:00 AM",
    status: "Not started",
    priority: "Low",
    progress: 0,
  },
  {
    id: 5,
    title: "Database Normalization Exercise",
    subject: "Database Systems",
    code: "CS204",
    due: "2026-11-18",
    dueLabel: "18 Nov, 11:59 PM",
    status: "Completed",
    priority: "Medium",
    progress: 100,
  },
];

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const paths: Record<string, React.ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    list: (
      <>
        <path d="M9 6h12M9 12h12M9 18h12" />
        <path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.09 14H3v-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.01A1.7 1.7 0 0 0 10 3.09V3h4v.09A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.01A1.7 1.7 0 0 0 20.91 10H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    arrow: (
      <>
        <path d="m9 18 6-6-6-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),
    flag: (
      <>
        <path d="M5 21V4" />
        <path d="M5 5h12l-2 4 2 4H5" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

export default function App() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeNav, setActiveNav] = useState("Overview");
  const [showModal, setShowModal] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const filtered = useMemo(
    () =>
      assignments.filter((item) => {
        const matchesQuery = `${item.title} ${item.subject}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesFilter = filter === "All" || item.status === filter;
        return matchesQuery && matchesFilter;
      }),
    [assignments, query, filter],
  );

  const completeAssignment = (id: number) => {
    setAssignments((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "Completed", progress: 100 } : item,
      ),
    );
  };

  const addAssignment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const due = String(form.get("due"));
    const date = new Date(`${due}T12:00:00`);
    setAssignments((items) => [
      {
        id: Date.now(),
        title: String(form.get("title")),
        subject: String(form.get("subject")),
        code: String(form.get("code") || "COURSE"),
        due,
        dueLabel:
          date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) + ", 11:59 PM",
        status: "Not started",
        priority: form.get("priority") as Priority,
        progress: 0,
      },
      ...items,
    ]);
    setShowModal(false);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <span />
            <span />
          </div>
          <span>
            due<span className="brand-dot">.</span>
          </span>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {[
            ["Overview", "grid"],
            ["Assignments", "list"],
            ["Calendar", "calendar"],
            ["Progress", "chart"],
          ].map(([label, icon]) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={activeNav === label ? "active" : ""}
            >
              <Icon name={icon} />
              <span>{label}</span>
              {label === "Assignments" && (
                <em>{assignments.filter((a) => a.status !== "Completed").length}</em>
              )}
            </button>
          ))}
          <p className="nav-label secondary">Account</p>
          <button
            onClick={() => setActiveNav("Settings")}
            className={activeNav === "Settings" ? "active" : ""}
          >
            <Icon name="settings" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="focus-card">
            <div className="focus-orbit">
              <span>73%</span>
            </div>
            <div>
              <strong>Weekly focus</strong>
              <p>12 of 16 tasks done</p>
            </div>
          </div>
          <button className="profile">
            <span className="avatar">AK</span>
            <span>
              <strong>Anshul Kameriya</strong>
              <small>Student</small>
            </span>
            <Icon name="more" size={18} />
          </button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="mobile-brand">
            due<span>.</span>
          </div>
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search assignments, subjects..."
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            <div className="date-block">
              <strong>Thursday</strong>
              <span>20 November</span>
            </div>
            <button
              className="icon-button"
              onClick={() => setShowNotice(!showNotice)}
              aria-label="Notifications"
            >
              <Icon name="bell" />
              <i />
            </button>
            {showNotice && (
              <div className="notification-pop">
                <strong>Stay on track</strong>
                <p>Your Data Structures report is due tonight.</p>
              </div>
            )}
            <button className="add-button" onClick={() => setShowModal(true)}>
              <Icon name="plus" size={18} /> New assignment
            </button>
          </div>
        </header>

        <div className="content">
          <section className="welcome">
            <div>
              <p className="eyebrow">Academic overview</p>
              <h1>
                Good morning, Anshul<span>.</span>
              </h1>
              <p>
                You have <strong>3 assignments</strong> to focus on this week. Let’s make progress.
              </p>
            </div>
            <div className="mini-calendar">
              <button>
                <Icon name="arrow" size={16} />
              </button>
              <div>
                <span>MON</span>
                <b>17</b>
              </div>
              <div>
                <span>TUE</span>
                <b>18</b>
              </div>
              <div>
                <span>WED</span>
                <b>19</b>
              </div>
              <div className="today">
                <span>THU</span>
                <b>20</b>
                <i />
              </div>
              <div>
                <span>FRI</span>
                <b>21</b>
              </div>
              <div>
                <span>SAT</span>
                <b>22</b>
              </div>
              <div>
                <span>SUN</span>
                <b>23</b>
              </div>
              <button className="next">
                <Icon name="arrow" size={16} />
              </button>
            </div>
          </section>

          <section className="stats">
            <article className="stat-card urgent">
              <div className="stat-icon">
                <Icon name="clock" />
              </div>
              <div>
                <span>Due today</span>
                <strong>
                  {
                    assignments.filter(
                      (a) => a.dueLabel.startsWith("Today") && a.status !== "Completed",
                    ).length
                  }
                </strong>
                <small>Needs your attention</small>
              </div>
              <span className="stat-arrow">
                <Icon name="arrow" />
              </span>
            </article>
            <article className="stat-card">
              <div className="stat-icon purple">
                <Icon name="list" />
              </div>
              <div>
                <span>In progress</span>
                <strong>{assignments.filter((a) => a.status === "In progress").length}</strong>
                <small>Across 2 subjects</small>
              </div>
              <span className="trend">↗ 12%</span>
            </article>
            <article className="stat-card">
              <div className="stat-icon green">
                <Icon name="check" />
              </div>
              <div>
                <span>Completed</span>
                <strong>{assignments.filter((a) => a.status === "Completed").length}</strong>
                <small>This semester</small>
              </div>
              <span className="trend green-text">↗ 8%</span>
            </article>
            <article className="stat-card progress-stat">
              <div className="ring">
                <span>
                  {Math.round(
                    assignments.reduce((sum, a) => sum + a.progress, 0) / assignments.length,
                  )}
                  %
                </span>
              </div>
              <div>
                <span>Overall progress</span>
                <strong>On track</strong>
                <small>Keep the momentum</small>
              </div>
            </article>
          </section>

          <section className="workspace-grid">
            <div className="assignments-panel">
              <div className="section-head">
                <div>
                  <p className="eyebrow">Your workload</p>
                  <h2>Upcoming assignments</h2>
                </div>
                <button>
                  View all <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="filter-row">
                <div>
                  {["All", "Not started", "In progress", "Completed"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={filter === item ? "selected" : ""}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <span>{filtered.length} assignments</span>
              </div>
              <div className="assignment-list">
                {filtered.length === 0 && (
                  <div className="empty-state">
                    <Icon name="search" />
                    <strong>No assignments found</strong>
                    <span>Try another search or filter.</span>
                  </div>
                )}
                {filtered.slice(0, 4).map((item) => (
                  <article
                    className={`assignment ${item.status === "Completed" ? "completed" : ""}`}
                    key={item.id}
                  >
                    <button
                      className="check-circle"
                      onClick={() => completeAssignment(item.id)}
                      aria-label={`Complete ${item.title}`}
                    >
                      {item.status === "Completed" && <Icon name="check" size={14} />}
                    </button>
                    <div className={`subject-icon subject-${item.id % 4}`}>
                      <Icon name="book" />
                    </div>
                    <div className="assignment-info">
                      <h3>{item.title}</h3>
                      <p>
                        {item.subject} <span>•</span> {item.code}
                      </p>
                    </div>
                    <div className="deadline">
                      <span className={item.dueLabel.startsWith("Today") ? "hot" : ""}>
                        <Icon name="clock" size={15} />
                        {item.dueLabel}
                      </span>
                      <small>{item.status}</small>
                    </div>
                    <div className="progress-cell">
                      <div>
                        <i style={{ width: `${item.progress}%` }} />
                      </div>
                      <span>{item.progress}%</span>
                    </div>
                    <span className={`priority ${item.priority.toLowerCase()}`}>
                      <Icon name="flag" size={13} />
                      {item.priority}
                    </span>
                    <button className="more-button">
                      <Icon name="more" size={20} />
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <aside className="focus-panel">
              <div className="section-head">
                <div>
                  <p className="eyebrow">Priority queue</p>
                  <h2>Focus next</h2>
                </div>
                <Icon name="flag" />
              </div>
              <article className="focus-task">
                <div className="focus-top">
                  <span>Due today</span>
                  <small>High priority</small>
                </div>
                <h3>
                  Data Structures
                  <br />
                  Lab Report
                </h3>
                <p>Complete implementation analysis and attach your output screenshots.</p>
                <div className="task-meta">
                  <span>
                    <Icon name="book" size={15} /> CS201
                  </span>
                  <span>
                    <Icon name="clock" size={15} /> 11:59 PM
                  </span>
                </div>
                <div className="task-progress">
                  <div>
                    <i />
                  </div>
                  <span>70%</span>
                </div>
                <button onClick={() => completeAssignment(1)}>
                  Continue working <Icon name="arrow" size={17} />
                </button>
                <div className="corner-art">
                  <span />
                  <span />
                  <span />
                </div>
              </article>
              <div className="tip">
                <span>01</span>
                <div>
                  <strong>Focus tip</strong>
                  <p>Break your report into 25-minute sessions for better concentration.</p>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>

      {showModal && (
        <div className="modal-backdrop" onMouseDown={() => setShowModal(false)}>
          <form className="modal" onSubmit={addAssignment} onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setShowModal(false)}>
              <Icon name="close" />
            </button>
            <p className="eyebrow">Plan ahead</p>
            <h2>Add new assignment</h2>
            <p className="modal-sub">Capture the details now, focus on the work later.</p>
            <label>
              Assignment title
              <input name="title" required placeholder="e.g. Operating Systems report" autoFocus />
            </label>
            <div className="form-row">
              <label>
                Subject
                <input name="subject" required placeholder="Subject name" />
              </label>
              <label>
                Course code
                <input name="code" placeholder="CS301" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Due date
                <input name="due" type="date" required />
              </label>
              <label>
                Priority
                <select name="priority" defaultValue="Medium">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </label>
            </div>
            <div className="modal-actions">
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit">
                Create assignment <Icon name="arrow" size={17} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
