# Graph Report - .  (2026-09-12)

## Corpus Check
- 103 files · ~226,467 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 753 nodes · 1011 edges · 115 communities (48 shown, 67 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Primitives (shadcn)
- Home Page Sections
- Site Shell & Layout
- TypeScript Config
- Server & Bot Gate
- Charts & Carousel UI
- Routing / Route Tree
- README / Project Docs
- UI Form Controls
- UI Buttons & Navigation
- shadcn Config
- SEO & Root Route
- Command & Dialog UI
- Menubar UI
- Internationalization (i18n)
- Package Dependencies
- Home & Services Routes
- Form & Label UI
- Lint & Dev Dependencies
- Context Menu UI
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110

## God Nodes (most connected - your core abstractions)
1. `cn()` - 69 edges
2. `compilerOptions` - 22 edges
3. `AURIA Nexus` - 16 edges
4. `handleBotAsset()` - 9 edges
5. `FileRoutesByPath` - 9 edges
6. `react` - 8 edges
7. `buildMeta()` - 8 edges
8. `buildLinks()` - 8 edges
9. `breadcrumbJsonLd()` - 8 edges
10. `jsonLdScript()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `useCarousel()` --references--> `react`  [EXTRACTED]
  src/components/ui/carousel.tsx → package.json
- `useChart()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **AURIA Nexus Tech Stack** — readme_react, readme_vite, readme_tailwind_css, readme_framer_motion, readme_three_js, readme_lucide_icons [EXTRACTED 1.00]
- **Homepage Section Composition** — readme_hero_section, readme_services_section, readme_how_it_works, readme_global_network, readme_industries, readme_contact_form [EXTRACTED 1.00]
- **TanStack File-Based Routing** — src_routes_readme_tanstack_start, src_routes_readme_routing_conventions, src_routes_readme_root_layout, src_routes_readme_route_tree_gen [EXTRACTED 1.00]

## Communities (115 total, 67 thin omitted)

### Community 0 - "UI Primitives (shadcn)"
Cohesion: 0.05
Nodes (39): Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay (+31 more)

### Community 1 - "Home Page Sections"
Cohesion: 0.05
Nodes (13): broadcastThumbs, destinationPorts, feedTiles, fieldTransmissionsRowA, fieldTransmissionsRowB, mapNodes, modules, opsPhotos (+5 more)

### Community 2 - "Site Shell & Layout"
Cohesion: 0.09
Nodes (19): ContactSection(), InteriorPage(), openRequestAccess(), RequestAccessModal(), ScrollProgress(), accentForPath(), IntroSplash(), links (+11 more)

### Community 3 - "TypeScript Config"
Cohesion: 0.06
Nodes (31): DOM, DOM.Iterable, ES2022, eslint.config.js, src/**/*.ts, src/**/*.tsx, vite/client, vite.config.ts (+23 more)

### Community 4 - "Server & Bot Gate"
Cohesion: 0.10
Nodes (24): ALL_BOTS, handleBotAsset(), isAnyBot(), isSearchBot(), notFound(), robotsTxt(), SEARCH_BOTS, sitemapXml() (+16 more)

### Community 5 - "Charts & Carousel UI"
Cohesion: 0.07
Nodes (25): react, react, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem (+17 more)

### Community 6 - "Routing / Route Tree"
Cohesion: 0.11
Nodes (23): getRouter(), Route, Route, Route, Route, AboutRoute, ContactRoute, FileRoutesByFullPath (+15 more)

### Community 7 - "README / Project Docs"
Cohesion: 0.11
Nodes (22): Animation System, AURIA Nexus, AURIA Brand Positioning, Contact Form, Luxury B2B Design Direction, Framer Motion, Global Network 3D Globe, GSAP (+14 more)

### Community 8 - "UI Form Controls"
Cohesion: 0.09
Nodes (12): Avatar, AvatarFallback, AvatarImage, Checkbox, HoverCardContent, PopoverContent, Progress, RadioGroup (+4 more)

### Community 9 - "UI Buttons & Navigation"
Cohesion: 0.19
Nodes (16): Button, ButtonProps, buttonVariants, Calendar(), CalendarDayButton(), Pagination(), PaginationContent, PaginationEllipsis() (+8 more)

### Community 10 - "shadcn Config"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 11 - "SEO & Root Route"
Cohesion: 0.14
Nodes (12): BuildMetaInput, GLOBAL_KEYWORDS, LinkTag, LOCALES, MetaTag, organizationJsonLd(), NOTE: hreflang alternates are intentionally NOT emitted until each locale, serviceJsonLd() (+4 more)

### Community 12 - "Command & Dialog UI"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 13 - "Menubar UI"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 14 - "Internationalization (i18n)"
Cohesion: 0.24
Nodes (10): LanguageSwitcher(), dirFor(), LanguageCode, LANGUAGES, ar, en, fr, applyDocumentLang() (+2 more)

### Community 15 - "Package Dependencies"
Cohesion: 0.13
Nodes (15): date-fns, i18next, dependencies, date-fns, i18next, @radix-ui/react-slot, @radix-ui/react-tabs, @radix-ui/react-toggle (+7 more)

### Community 16 - "Home & Services Routes"
Cohesion: 0.20
Nodes (9): AuriaHome(), absoluteUrl(), breadcrumbJsonLd(), buildLinks(), buildMeta(), jsonLdScript(), Route, engagements (+1 more)

### Community 17 - "Form & Label UI"
Cohesion: 0.15
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 18 - "Lint & Dev Dependencies"
Cohesion: 0.18
Nodes (11): eslint-config-prettier, @eslint/js, eslint-plugin-prettier, nitro, devDependencies, eslint-config-prettier, @eslint/js, eslint-plugin-prettier (+3 more)

### Community 19 - "Context Menu UI"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.31
Nodes (7): BandwidthBars(), fieldTransmissions, Hero(), Reveal(), Sparkbars(), useIsMobileViewport(), usePerfLite()

### Community 22 - "Community 22"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 23 - "Community 23"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 24 - "Community 24"
Cohesion: 0.32
Nodes (7): centralAngle(), CN, DEST, Globe, makeLabel(), Node, TradeGlobe()

### Community 25 - "Community 25"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 26 - "Community 26"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 27 - "Community 27"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 28 - "Community 28"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 29 - "Community 29"
Cohesion: 0.29
Nodes (6): name, overrides, rolldown, private, sideEffects, type

### Community 30 - "Community 30"
Cohesion: 0.29
Nodes (7): scripts, build, build:dev, dev, format, lint, preview

### Community 31 - "Community 31"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 32 - "Community 32"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 33 - "Community 33"
Cohesion: 0.29
Nodes (3): offices, teamRoles, values

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (3): guarantees, Route, steps

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (3): belts, Route, sectors

### Community 36 - "Community 36"
Cohesion: 0.33
Nodes (3): AuriaLogo(), highlights, Route

### Community 37 - "Community 37"
Cohesion: 0.40
Nodes (5): FeedsSection(), OperationsGallery(), TransmissionCard(), unsplashSrcSet(), VideoTile()

### Community 38 - "Community 38"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 40 - "Community 40"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 41 - "Community 41"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 42 - "Community 42"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 43 - "Community 43"
Cohesion: 0.67
Nodes (3): esbuild, esbuild, esbuild

## Knowledge Gaps
- **374 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `css` (+369 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **67 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Package Dependencies` to `Charts & Carousel UI`, `Community 29`, `Community 43`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 69`, `Community 70`, `Community 71`, `Community 72`, `Community 73`, `Community 74`, `Community 75`, `Community 76`, `Community 77`, `Community 78`, `Community 79`, `Community 80`, `Community 81`, `Community 82`, `Community 83`, `Community 84`, `Community 85`, `Community 86`, `Community 87`, `Community 88`, `Community 89`, `Community 90`, `Community 91`, `Community 92`, `Community 93`, `Community 94`, `Community 95`, `Community 96`, `Community 97`, `Community 98`, `Community 99`, `Community 100`, `Community 101`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Why does `cn()` connect `UI Buttons & Navigation` to `UI Primitives (shadcn)`, `Charts & Carousel UI`, `UI Form Controls`, `Command & Dialog UI`, `Menubar UI`, `Form & Label UI`, `Context Menu UI`, `Community 20`, `Community 22`, `Community 23`, `Community 25`, `Community 26`, `Community 27`, `Community 28`, `Community 31`, `Community 32`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 45`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **Why does `react` connect `Charts & Carousel UI` to `UI Primitives (shadcn)`, `UI Buttons & Navigation`, `Package Dependencies`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _374 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Primitives (shadcn)` be split into smaller, more focused modules?**
  _Cohesion score 0.05217391304347826 - nodes in this community are weakly interconnected._
- **Should `Home Page Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `Site Shell & Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.0928030303030303 - nodes in this community are weakly interconnected._