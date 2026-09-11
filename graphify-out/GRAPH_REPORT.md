# Graph Report - .  (2026-09-11)

## Corpus Check
- 99 files · ~209,823 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 734 nodes · 936 edges · 113 communities (54 shown, 59 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.7)
- Token cost: 170,517 input · 0 output

## Community Hubs (Navigation)
- Build Tooling & Linting
- AuriaHome Page Sections
- TypeScript & Vite Config
- Site Shell & Request-Access Modal
- Sidebar Component
- Brand & Design Concepts
- Alert / Checkbox UI Primitives
- i18n & Language Switcher
- Button & Calendar UI
- shadcn components.json Config
- Error Capture Utility
- Router & Route Tree
- Command Palette UI
- Menubar UI
- NPM Dependencies
- package.json Scripts
- Form Components
- Carousel Component
- Chart Components
- Context Menu UI
- Dropdown Menu UI
- Route Definitions
- Perf Hooks & Hero
- Alert Dialog UI
- Sheet Component
- Table Component
- React Hooks
- Interior / How-We-Work Page
- Trade Globe
- Breadcrumb Component
- drawer
- navigation-menu
- select
- card
- toggle-group
- about
- industries
- services
- login
- Auria Brand Identity
- unsplashSrcSet
- input-otp
- Aerial view of container shipping port w
- Container ships loading at port under ga
- Warehouse aisle with yellow parts bins a
- accordion
- avatar
- badge
- tabs
- Messaging Contact Channels
- radio-group
- sonner
- clsx
- cmdk
- date-fns
- embla-carousel-react
- @hookform/resolvers
- input-otp
- lucide-react
- motion
- @radix-ui/react-accordion
- @radix-ui/react-alert-dialog
- @radix-ui/react-aspect-ratio
- @radix-ui/react-avatar
- @radix-ui/react-checkbox
- @radix-ui/react-collapsible
- @radix-ui/react-context-menu
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-hover-card
- @radix-ui/react-label
- @radix-ui/react-menubar
- @radix-ui/react-navigation-menu
- @radix-ui/react-popover
- @radix-ui/react-progress
- @radix-ui/react-radio-group
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slider
- @radix-ui/react-switch
- @radix-ui/react-toggle-group
- @radix-ui/react-tooltip
- react-day-picker
- react-dom
- react-hook-form
- react-i18next
- react-resizable-panels
- @react-three/drei
- @react-three/fiber
- recharts
- sonner
- tailwind-merge
- tailwindcss
- @tailwindcss/vite
- @tanstack/react-query
- @tanstack/react-router
- @tanstack/react-start
- @tanstack/router-plugin
- three
- tw-animate-css
- vite-tsconfig-paths
- zod
- isLowPerfEnv
- smoothPath
- input
- separator
- skeleton
- tooltip

## God Nodes (most connected - your core abstractions)
1. `cn()` - 69 edges
2. `compilerOptions` - 22 edges
3. `AURIA Nexus` - 17 edges
4. `FileRoutesByPath` - 9 edges
5. `react` - 8 edges
6. `scripts` - 7 edges
7. `usePerfLite()` - 7 edges
8. `aliases` - 6 edges
9. `buttonVariants` - 6 edges
10. `tailwind` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Search Engine Crawlers Allowlist` --conceptually_related_to--> `AURIA Nexus`  [INFERRED]
  public/robots.txt → README.md
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `useCarousel()` --references--> `react`  [EXTRACTED]
  src/components/ui/carousel.tsx → package.json
- `useChart()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **AURIA Nexus Tech Stack** — readme_react, readme_vite, readme_tailwind_css, readme_framer_motion, readme_three_js, readme_lucide_icons [EXTRACTED 1.00]
- **Homepage Section Composition** — readme_hero_section, readme_services_section, readme_how_it_works, readme_global_network, readme_industries, readme_contact_form [EXTRACTED 1.00]
- **TanStack File-Based Routing** — src_routes_readme_tanstack_start, src_routes_readme_routing_conventions, src_routes_readme_root_layout, src_routes_readme_route_tree_gen [EXTRACTED 1.00]
- **Scannable Messaging Contact Set** — src_assets_whatsapp_image_2026_09_05_at_20_40_34_qr, src_assets_whatsapp_image_2026_09_05_at_20_40_35_qr, concept_contact_channels [INFERRED 0.80]
- **Global trade and logistics hero/visual imagery for Auria Nexus site** — src_assets_globe_earth_topology_earth_topology_map, src_assets_hero_1436491865332_7a61a109cc05_airplane_wing_sunset, src_assets_hero_1494412574643_ff11b0a5c1c3_container_port_gantry_crane, src_assets_hero_1494412651409_8963ce7935a7_container_terminal_aerial [INFERRED 0.85]
- **Logistics and supply chain hero imagery (road, warehouse, sea freight)** — src_assets_hero_1519003722824_194d4455a60c_freight_truck_mountain_road, src_assets_hero_1553413077_190dd305871c_warehouse_aisle, src_assets_hero_1578575437130_527eed3abbec_container_ship_port [INFERRED 0.85]
- **Logistics and supply-chain hero imagery (warehousing, road freight, ocean shipping)** — src_assets_hero_1586528116493_a029325540fa_warehouse_bin_shelving, src_assets_hero_1587293852726_70cdb56c2866_warehouse_pallet_racking, src_assets_hero_1601584115197_04ecc0da31d7_scania_freight_truck, src_assets_hero_vessel_9153850_maersk_container_ship [INFERRED 0.85]

## Communities (113 total, 59 thin omitted)

### Community 0 - "Build Tooling & Linting"
Cohesion: 0.06
Nodes (36): esbuild, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals (+28 more)

### Community 1 - "AuriaHome Page Sections"
Cohesion: 0.06
Nodes (13): broadcastThumbs, destinationPorts, feedTiles, fieldTransmissionsRowA, fieldTransmissionsRowB, mapNodes, modules, opsPhotos (+5 more)

### Community 2 - "TypeScript & Vite Config"
Cohesion: 0.06
Nodes (31): DOM, DOM.Iterable, ES2022, eslint.config.js, src/**/*.ts, src/**/*.tsx, vite/client, vite.config.ts (+23 more)

### Community 3 - "Site Shell & Request-Access Modal"
Cohesion: 0.10
Nodes (14): ContactSection(), openRequestAccess(), RequestAccessModal(), ScrollProgress(), IntroSplash(), links, NavLink, PageTransition() (+6 more)

### Community 4 - "Sidebar Component"
Cohesion: 0.07
Nodes (26): Sidebar, SidebarContent, SidebarContext, SidebarContextProps, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent (+18 more)

### Community 5 - "Brand & Design Concepts"
Cohesion: 0.11
Nodes (23): Search Engine Crawlers Allowlist, Animation System, AURIA Nexus, AURIA Brand Positioning, Contact Form, Luxury B2B Design Direction, Framer Motion, Global Network 3D Globe (+15 more)

### Community 6 - "Alert / Checkbox UI Primitives"
Cohesion: 0.09
Nodes (13): Alert, AlertDescription, AlertTitle, alertVariants, Checkbox, HoverCardContent, PopoverContent, Progress (+5 more)

### Community 7 - "i18n & Language Switcher"
Cohesion: 0.18
Nodes (11): LanguageSwitcher(), dirFor(), LanguageCode, LANGUAGES, ar, en, fr, applyDocumentLang() (+3 more)

### Community 8 - "Button & Calendar UI"
Cohesion: 0.19
Nodes (16): Button, ButtonProps, buttonVariants, Calendar(), CalendarDayButton(), Pagination(), PaginationContent, PaginationEllipsis() (+8 more)

### Community 9 - "shadcn components.json Config"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 10 - "Error Capture Utility"
Cohesion: 0.17
Nodes (13): consumeLastCapturedError(), describeError(), describeStatus(), originalConsoleError, safeStringify(), renderErrorPage(), fetch(), getServerEntry() (+5 more)

### Community 11 - "Router & Route Tree"
Cohesion: 0.13
Nodes (17): getRouter(), AboutRoute, ContactRoute, FileRoutesByFullPath, FileRoutesByTo, FileRouteTypes, HowWeWorkRoute, IndexRoute (+9 more)

### Community 12 - "Command Palette UI"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 13 - "Menubar UI"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 14 - "NPM Dependencies"
Cohesion: 0.13
Nodes (15): class-variance-authority, i18next, dependencies, class-variance-authority, i18next, @radix-ui/react-slot, @radix-ui/react-tabs, @radix-ui/react-toggle (+7 more)

### Community 15 - "package.json Scripts"
Cohesion: 0.14
Nodes (13): name, overrides, rolldown, private, scripts, build, build:dev, dev (+5 more)

### Community 16 - "Form Components"
Cohesion: 0.15
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 17 - "Carousel Component"
Cohesion: 0.15
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 18 - "Chart Components"
Cohesion: 0.20
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 19 - "Context Menu UI"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 20 - "Dropdown Menu UI"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 21 - "Route Definitions"
Cohesion: 0.22
Nodes (8): AuriaHome(), Route, Route, Route, Route, Route, FileRoutesById, FileRoutesByPath

### Community 22 - "Perf Hooks & Hero"
Cohesion: 0.31
Nodes (7): BandwidthBars(), fieldTransmissions, Hero(), Reveal(), Sparkbars(), useIsMobileViewport(), usePerfLite()

### Community 23 - "Alert Dialog UI"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 24 - "Sheet Component"
Cohesion: 0.22
Nodes (8): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants

### Community 25 - "Table Component"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 26 - "React Hooks"
Cohesion: 0.25
Nodes (7): react, react, useCarousel(), useChart(), useFormField(), useSidebar(), useIsMobile()

### Community 27 - "Interior / How-We-Work Page"
Cohesion: 0.29
Nodes (3): InteriorPage(), guarantees, steps

### Community 28 - "Trade Globe"
Cohesion: 0.32
Nodes (7): centralAngle(), CN, DEST, Globe, makeLabel(), Node, TradeGlobe()

### Community 29 - "Breadcrumb Component"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 30 - "drawer"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 31 - "navigation-menu"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 32 - "select"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 33 - "card"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 34 - "toggle-group"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 35 - "about"
Cohesion: 0.29
Nodes (3): offices, teamRoles, values

### Community 36 - "industries"
Cohesion: 0.29
Nodes (3): belts, Route, sectors

### Community 37 - "services"
Cohesion: 0.29
Nodes (3): engagements, Route, services

### Community 38 - "login"
Cohesion: 0.33
Nodes (3): AuriaLogo(), highlights, Route

### Community 39 - "Auria Brand Identity"
Cohesion: 0.40
Nodes (5): Auria Brand Identity, Dark Square Frame (#0B0E12), Gold Vertical Linear Gradient, Auria Chevron/A Logo Mark, Earth Blue Marble Equirectangular Texture

### Community 40 - "unsplashSrcSet"
Cohesion: 0.40
Nodes (5): FeedsSection(), OperationsGallery(), TransmissionCard(), unsplashSrcSet(), VideoTile()

### Community 41 - "input-otp"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 42 - "Aerial view of container shipping port w"
Cohesion: 0.50
Nodes (4): Earth topology grayscale height/relief map (equirectangular), Airplane wing above clouds at sunset (air freight / travel hero image), Aerial view of container shipping port with gantry crane and stacked containers (hero image), Aerial view of container terminal rows with cranes and cargo ship (hero image)

### Community 43 - "Container ships loading at port under ga"
Cohesion: 0.67
Nodes (4): Macro photo of electronic circuit board with microchip, Cargo freight truck on mountain highway (Randon / Granotrade), Warehouse storage aisle with stacked pallet racking, Container ships loading at port under gantry cranes (Northern Justice, SSA Terminals)

### Community 44 - "Warehouse aisle with yellow parts bins a"
Cohesion: 0.50
Nodes (4): Warehouse aisle with yellow parts bins and worker, Warehouse pallet racking stacked with shrink-wrapped cartons, Scania semi-truck hauling freight on highway, Maersk Line container ship at port

### Community 45 - "accordion"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 46 - "avatar"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 47 - "badge"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 48 - "tabs"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 49 - "Messaging Contact Channels"
Cohesion: 1.00
Nodes (3): Messaging Contact Channels, WhatsApp QR Code, WeChat QR Code

## Knowledge Gaps
- **372 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `css` (+367 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **59 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `NPM Dependencies` to `Build Tooling & Linting`, `package.json Scripts`, `React Hooks`, `clsx`, `cmdk`, `date-fns`, `embla-carousel-react`, `@hookform/resolvers`, `input-otp`, `lucide-react`, `motion`, `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slider`, `@radix-ui/react-switch`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react-day-picker`, `react-dom`, `react-hook-form`, `react-i18next`, `react-resizable-panels`, `@react-three/drei`, `@react-three/fiber`, `recharts`, `sonner`, `tailwind-merge`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`, `three`, `tw-animate-css`, `vite-tsconfig-paths`, `zod`?**
  _High betweenness centrality (0.216) - this node is a cross-community bridge._
- **Why does `cn()` connect `Button & Calendar UI` to `Sidebar Component`, `Alert / Checkbox UI Primitives`, `Command Palette UI`, `Menubar UI`, `Form Components`, `Carousel Component`, `Chart Components`, `Context Menu UI`, `Dropdown Menu UI`, `Alert Dialog UI`, `Sheet Component`, `Table Component`, `Breadcrumb Component`, `drawer`, `navigation-menu`, `select`, `card`, `toggle-group`, `input-otp`, `accordion`, `avatar`, `badge`, `tabs`, `radio-group`, `input`, `separator`, `skeleton`, `tooltip`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Why does `react` connect `React Hooks` to `Button & Calendar UI`, `NPM Dependencies`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _372 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Build Tooling & Linting` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `AuriaHome Page Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `TypeScript & Vite Config` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._