
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    function hasContext(key) {
        return get_current_component().$$.context.has(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.50.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\Header.svelte generated by Svelte v3.50.1 */

    const file$7 = "src\\components\\Header.svelte";

    function create_fragment$9(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let div5;
    	let div3;
    	let div2;
    	let a0;
    	let div0;
    	let h40;
    	let t1;
    	let h41;
    	let t3;
    	let div1;
    	let a1;
    	let t5;
    	let a2;
    	let t7;
    	let div4;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[1]);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			a0 = element("a");
    			div0 = element("div");
    			h40 = element("h4");
    			h40.textContent = "FreezedIce";
    			t1 = space();
    			h41 = element("h4");
    			h41.textContent = "Programmer";
    			t3 = space();
    			div1 = element("div");
    			a1 = element("a");
    			a1.textContent = "Portfolio";
    			t5 = space();
    			a2 = element("a");
    			a2.textContent = "Contact";
    			t7 = space();
    			div4 = element("div");
    			attr_dev(h40, "class", "font-bold text-2xl");
    			add_location(h40, file$7, 9, 20, 219);
    			attr_dev(h41, "class", "font-light");
    			add_location(h41, file$7, 10, 20, 287);
    			attr_dev(div0, "class", "flex flex-col");
    			add_location(div0, file$7, 8, 16, 170);
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$7, 7, 12, 140);
    			attr_dev(a1, "class", "button");
    			attr_dev(a1, "href", "/portfolio");
    			add_location(a1, file$7, 14, 16, 436);
    			attr_dev(a2, "class", "button");
    			attr_dev(a2, "href", "/contact");
    			add_location(a2, file$7, 15, 16, 503);
    			attr_dev(div1, "class", "flex items-center gap-4");
    			add_location(div1, file$7, 13, 12, 381);
    			attr_dev(div2, "class", "flex justify-between");
    			add_location(div2, file$7, 6, 8, 92);
    			attr_dev(div3, "class", "content");
    			add_location(div3, file$7, 5, 4, 61);
    			attr_dev(div4, "class", "bg-black mx-auto h-[1px] mt-3 w-full");
    			add_location(div4, file$7, 20, 4, 715);
    			attr_dev(div5, "class", "header");
    			add_location(div5, file$7, 4, 0, 35);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div3);
    			append_dev(div3, div2);
    			append_dev(div2, a0);
    			append_dev(a0, div0);
    			append_dev(div0, h40);
    			append_dev(div0, t1);
    			append_dev(div0, h41);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, a1);
    			append_dev(div1, t5);
    			append_dev(div1, a2);
    			append_dev(div5, t7);
    			append_dev(div5, div4);

    			if (!mounted) {
    				dispose = listen_dev(window, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[1]();
    				});

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*y*/ 1 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*y*/ ctx[0]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let y;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(0, y = window.pageYOffset);
    	}

    	$$self.$capture_state = () => ({ y });

    	$$self.$inject_state = $$props => {
    		if ('y' in $$props) $$invalidate(0, y = $$props.y);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [y, onwindowscroll];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\components\HorizontalCard.svelte generated by Svelte v3.50.1 */

    const file$6 = "src\\components\\HorizontalCard.svelte";
    const get_description_slot_changes = dirty => ({});
    const get_description_slot_context = ctx => ({});

    function create_fragment$8(ctx) {
    	let div4;
    	let div0;
    	let img_1;
    	let img_1_src_value;
    	let t0;
    	let div3;
    	let div2;
    	let h1;
    	let t1;
    	let t2;
    	let div1;
    	let t3;
    	let a;
    	let t4;
    	let current;
    	const description_slot_template = /*#slots*/ ctx[4].description;
    	const description_slot = create_slot(description_slot_template, ctx, /*$$scope*/ ctx[3], get_description_slot_context);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			img_1 = element("img");
    			t0 = space();
    			div3 = element("div");
    			div2 = element("div");
    			h1 = element("h1");
    			t1 = text(/*name*/ ctx[0]);
    			t2 = space();
    			div1 = element("div");
    			if (description_slot) description_slot.c();
    			t3 = space();
    			a = element("a");
    			t4 = text("More >");
    			attr_dev(img_1, "class", "w-full h-full object-cover");
    			if (!src_url_equal(img_1.src, img_1_src_value = /*img*/ ctx[1])) attr_dev(img_1, "src", img_1_src_value);
    			attr_dev(img_1, "alt", "");
    			add_location(img_1, file$6, 9, 8, 194);
    			attr_dev(div0, "class", "card basis-1/2 border-black border-r-[1px]");
    			add_location(div0, file$6, 8, 4, 128);
    			attr_dev(h1, "class", "highlight-text hover:underline select-none cursor-pointer");
    			add_location(h1, file$6, 13, 12, 373);
    			attr_dev(div1, "class", "text-box justify-self-between pt-1");
    			add_location(div1, file$6, 14, 12, 468);
    			add_location(div2, file$6, 12, 8, 354);
    			attr_dev(a, "href", /*href*/ ctx[2]);
    			attr_dev(a, "class", "link");
    			add_location(a, file$6, 19, 8, 667);
    			attr_dev(div3, "class", "basis-1/2 flex flex-col items-start justify-between mx-8 my-8");
    			add_location(div3, file$6, 11, 4, 269);
    			attr_dev(div4, "class", "flex black-outline");
    			add_location(div4, file$6, 7, 0, 90);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, img_1);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, h1);
    			append_dev(h1, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);

    			if (description_slot) {
    				description_slot.m(div1, null);
    			}

    			append_dev(div3, t3);
    			append_dev(div3, a);
    			append_dev(a, t4);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*img*/ 2 && !src_url_equal(img_1.src, img_1_src_value = /*img*/ ctx[1])) {
    				attr_dev(img_1, "src", img_1_src_value);
    			}

    			if (!current || dirty & /*name*/ 1) set_data_dev(t1, /*name*/ ctx[0]);

    			if (description_slot) {
    				if (description_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						description_slot,
    						description_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(description_slot_template, /*$$scope*/ ctx[3], dirty, get_description_slot_changes),
    						get_description_slot_context
    					);
    				}
    			}

    			if (!current || dirty & /*href*/ 4) {
    				attr_dev(a, "href", /*href*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(description_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(description_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (description_slot) description_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HorizontalCard', slots, ['description']);
    	let { name } = $$props;
    	let { img } = $$props;
    	let { href } = $$props;
    	const writable_props = ['name', 'img', 'href'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HorizontalCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('img' in $$props) $$invalidate(1, img = $$props.img);
    		if ('href' in $$props) $$invalidate(2, href = $$props.href);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ name, img, href });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('img' in $$props) $$invalidate(1, img = $$props.img);
    		if ('href' in $$props) $$invalidate(2, href = $$props.href);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, img, href, $$scope, slots];
    }

    class HorizontalCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { name: 0, img: 1, href: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HorizontalCard",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<HorizontalCard> was created without expected prop 'name'");
    		}

    		if (/*img*/ ctx[1] === undefined && !('img' in props)) {
    			console.warn("<HorizontalCard> was created without expected prop 'img'");
    		}

    		if (/*href*/ ctx[2] === undefined && !('href' in props)) {
    			console.warn("<HorizontalCard> was created without expected prop 'href'");
    		}
    	}

    	get name() {
    		throw new Error("<HorizontalCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<HorizontalCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get img() {
    		throw new Error("<HorizontalCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set img(value) {
    		throw new Error("<HorizontalCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<HorizontalCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<HorizontalCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\Main.svelte generated by Svelte v3.50.1 */
    const file$5 = "src\\pages\\Main.svelte";

    // (20:12) 
    function create_description_slot_2(ctx) {
    	let span;
    	let t0;
    	let br;
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("Unity Developer");
    			br = element("br");
    			t1 = text("1 year");
    			add_location(br, file$5, 19, 52, 1257);
    			attr_dev(span, "slot", "description");
    			add_location(span, file$5, 19, 12, 1217);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, br);
    			append_dev(span, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_description_slot_2.name,
    		type: "slot",
    		source: "(20:12) ",
    		ctx
    	});

    	return block;
    }

    // (27:12) 
    function create_description_slot_1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Minimalist puzzle game about connecting stars. Vivamus ut sollicitudin mi.";
    			attr_dev(span, "slot", "description");
    			add_location(span, file$5, 26, 12, 1633);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_description_slot_1.name,
    		type: "slot",
    		source: "(27:12) ",
    		ctx
    	});

    	return block;
    }

    // (30:12) 
    function create_description_slot(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Minimalist puzzle game about connecting stars. Vivamus ut sollicitudin mi.";
    			attr_dev(span, "slot", "description");
    			add_location(span, file$5, 29, 12, 1877);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_description_slot.name,
    		type: "slot",
    		source: "(30:12) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div3;
    	let h10;
    	let t1;
    	let div2;
    	let div0;
    	let t3;
    	let div1;
    	let img;
    	let img_src_value;
    	let t4;
    	let div6;
    	let h11;
    	let t6;
    	let div4;
    	let horizontalcard0;
    	let t7;
    	let h12;
    	let t9;
    	let div5;
    	let horizontalcard1;
    	let t10;
    	let horizontalcard2;
    	let current;

    	horizontalcard0 = new HorizontalCard({
    			props: {
    				name: "Italic Pig",
    				img: "img/italicpig/logo.jpg",
    				href: "#/italicpig",
    				$$slots: { description: [create_description_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	horizontalcard1 = new HorizontalCard({
    			props: {
    				name: "Constellations",
    				img: "img/constellations/logo.png",
    				href: "#/constellations",
    				$$slots: { description: [create_description_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	horizontalcard2 = new HorizontalCard({
    			props: {
    				name: "Flip'n Seas",
    				img: "img/flipseas/logo.png",
    				href: "#/constellations",
    				$$slots: { description: [create_description_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			h10 = element("h1");
    			h10.textContent = "About";
    			t1 = space();
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut sollicitudin mi. Integer rhoncus fringilla nulla, id malesuada urna. Nunc molestie metus id ipsum facilisis, cursus efficitur nisi mollis. Aenean vel hendrerit magna, tristique posuere felis. Cras a nisl id elit rutrum viverra in a libero. Fusce dapibus lorem eget porta molestie. Morbi nec urna eleifend, imperdiet ante eget, mollis augue. Curabitur ut dignissim erat.";
    			t3 = space();
    			div1 = element("div");
    			img = element("img");
    			t4 = space();
    			div6 = element("div");
    			h11 = element("h1");
    			h11.textContent = "Work Experience";
    			t6 = space();
    			div4 = element("div");
    			create_component(horizontalcard0.$$.fragment);
    			t7 = space();
    			h12 = element("h1");
    			h12.textContent = "Projects";
    			t9 = space();
    			div5 = element("div");
    			create_component(horizontalcard1.$$.fragment);
    			t10 = space();
    			create_component(horizontalcard2.$$.fragment);
    			attr_dev(h10, "class", "highlight-text-big");
    			add_location(h10, file$5, 5, 4, 144);
    			attr_dev(div0, "class", "text-box basis-3/5");
    			add_location(div0, file$5, 7, 8, 260);
    			attr_dev(img, "class", "w-full h-full border-black border-[1px]");
    			if (!src_url_equal(img.src, img_src_value = "img/sample.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$5, 11, 12, 820);
    			attr_dev(div1, "class", "basis-2/5 aspect-square");
    			add_location(div1, file$5, 10, 8, 769);
    			attr_dev(div2, "class", "self-stretch flex justify-between pt-2 gap-12");
    			add_location(div2, file$5, 6, 4, 191);
    			attr_dev(div3, "class", "pt-6 flex flex-col items-start");
    			add_location(div3, file$5, 4, 0, 94);
    			attr_dev(h11, "class", "highlight-text-big");
    			add_location(h11, file$5, 16, 4, 989);
    			attr_dev(div4, "class", "self-stretch flex flex-col items-stretch mt-4 gap-8");
    			add_location(div4, file$5, 17, 4, 1046);
    			attr_dev(h12, "class", "highlight-text-big mt-8");
    			add_location(h12, file$5, 23, 4, 1393);
    			attr_dev(div5, "class", "self-stretch flex flex-col items-stretch mt-4 gap-8");
    			add_location(div5, file$5, 24, 4, 1448);
    			attr_dev(div6, "class", "mt-8 flex flex-col items-start");
    			add_location(div6, file$5, 15, 0, 939);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, h10);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, img);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, h11);
    			append_dev(div6, t6);
    			append_dev(div6, div4);
    			mount_component(horizontalcard0, div4, null);
    			append_dev(div6, t7);
    			append_dev(div6, h12);
    			append_dev(div6, t9);
    			append_dev(div6, div5);
    			mount_component(horizontalcard1, div5, null);
    			append_dev(div5, t10);
    			mount_component(horizontalcard2, div5, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const horizontalcard0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				horizontalcard0_changes.$$scope = { dirty, ctx };
    			}

    			horizontalcard0.$set(horizontalcard0_changes);
    			const horizontalcard1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				horizontalcard1_changes.$$scope = { dirty, ctx };
    			}

    			horizontalcard1.$set(horizontalcard1_changes);
    			const horizontalcard2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				horizontalcard2_changes.$$scope = { dirty, ctx };
    			}

    			horizontalcard2.$set(horizontalcard2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(horizontalcard0.$$.fragment, local);
    			transition_in(horizontalcard1.$$.fragment, local);
    			transition_in(horizontalcard2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(horizontalcard0.$$.fragment, local);
    			transition_out(horizontalcard1.$$.fragment, local);
    			transition_out(horizontalcard2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div6);
    			destroy_component(horizontalcard0);
    			destroy_component(horizontalcard1);
    			destroy_component(horizontalcard2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ HorizontalCard });
    	return [];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\Tailwind.svelte generated by Svelte v3.50.1 */

    function create_fragment$6(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tailwind', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tailwind> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Tailwind extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tailwind",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    function p(e,a=!1){return e=e.slice(e.startsWith("/#")?2:0,e.endsWith("/*")?-2:void 0),e.startsWith("/")||(e="/"+e),e==="/"&&(e=""),a&&!e.endsWith("/")&&(e+="/"),e}function d(e,a){e=p(e,!0),a=p(a,!0);let r=[],n={},t=!0,s=e.split("/").map(o=>o.startsWith(":")?(r.push(o.slice(1)),"([^\\/]+)"):o).join("\\/"),c=a.match(new RegExp(`^${s}$`));return c||(t=!1,c=a.match(new RegExp(`^${s}`))),c?(r.forEach((o,h)=>n[o]=c[h+1]),{exact:t,params:n,part:c[0].slice(0,-1)}):null}function x(e,a,r){if(r==="")return e;if(r[0]==="/")return r;let n=c=>c.split("/").filter(o=>o!==""),t=n(e),s=a?n(a):[];return "/"+s.map((c,o)=>t[o]).join("/")+"/"+r}function m(e,a,r,n){let t=[a,"data-"+a].reduce((s,c)=>{let o=e.getAttribute(c);return r&&e.removeAttribute(c),o===null?s:o},!1);return !n&&t===""?!0:t||n||!1}function S(e){let a=e.split("&").map(r=>r.split("=")).reduce((r,n)=>{let t=n[0];if(!t)return r;let s=n.length>1?n[n.length-1]:!0;return typeof s=="string"&&s.includes(",")&&(s=s.split(",")),r[t]===void 0?r[t]=[s]:r[t].push(s),r},{});return Object.entries(a).reduce((r,n)=>(r[n[0]]=n[1].length>1?n[1]:n[1][0],r),{})}function M(e){return Object.entries(e).map(([a,r])=>r?r===!0?a:`${a}=${Array.isArray(r)?r.join(","):r}`:null).filter(a=>a).join("&")}function w(e,a){return e?a+e:""}function k(e){throw new Error("[Tinro] "+e)}var i={HISTORY:1,HASH:2,MEMORY:3,OFF:4,run(e,a,r,n){return e===this.HISTORY?a&&a():e===this.HASH?r&&r():n&&n()},getDefault(){return !window||window.location.pathname==="srcdoc"?this.MEMORY:this.HISTORY}};var y,$,H,b="",l=E();function E(){let e=i.getDefault(),a,r=c=>window.onhashchange=window.onpopstate=y=null,n=c=>a&&a(R(e)),t=c=>{c&&(e=c),r(),e!==i.OFF&&i.run(e,o=>window.onpopstate=n,o=>window.onhashchange=n)&&n();},s=c=>{let o=Object.assign(R(e),c);return o.path+w(M(o.query),"?")+w(o.hash,"#")};return {mode:t,get:c=>R(e),go(c,o){_(e,c,o),n();},start(c){a=c,t();},stop(){a=null,t(i.OFF);},set(c){this.go(s(c),!c.path);},methods(){return j(this)},base:c=>b=c}}function _(e,a,r){!r&&($=H);let n=t=>history[`${r?"replace":"push"}State`]({},"",t);i.run(e,t=>n(b+a),t=>n(`#${a}`),t=>y=a);}function R(e){let a=window.location,r=i.run(e,t=>(b?a.pathname.replace(b,""):a.pathname)+a.search+a.hash,t=>String(a.hash.slice(1)||"/"),t=>y||"/"),n=r.match(/^([^?#]+)(?:\?([^#]+))?(?:\#(.+))?$/);return H=r,{url:r,from:$,path:n[1]||"",query:S(n[2]||""),hash:n[3]||""}}function j(e){let a=()=>e.get().query,r=c=>e.set({query:c}),n=c=>r(c(a())),t=()=>e.get().hash,s=c=>e.set({hash:c});return {hash:{get:t,set:s,clear:()=>s("")},query:{replace:r,clear:()=>r(""),get(c){return c?a()[c]:a()},set(c,o){n(h=>(h[c]=o,h));},delete(c){n(o=>(o[c]&&delete o[c],o));}}}}var f=T();function T(){let{subscribe:e}=writable(l.get(),a=>{l.start(a);let r=P(l.go);return ()=>{l.stop(),r();}});return {subscribe:e,goto:l.go,params:Q,meta:O,useHashNavigation:a=>l.mode(a?i.HASH:i.HISTORY),mode:{hash:()=>l.mode(i.HASH),history:()=>l.mode(i.HISTORY),memory:()=>l.mode(i.MEMORY)},base:l.base,location:l.methods()}}function Y(e){let a,r,n,t,s=()=>{a=m(e,"href").replace(/^\/#|[?#].*$|\/$/g,""),r=m(e,"exact",!0),n=m(e,"active-class",!0,"active");},c=()=>{let o=d(a,t);o&&(o.exact&&r||!r)?e.classList.add(n):e.classList.remove(n);};return s(),{destroy:f.subscribe(o=>{t=o.path,c();}),update:()=>{s(),c();}}}function P(e){let a=r=>{let n=r.target.closest("a[href]"),t=n&&m(n,"target",!1,"_self"),s=n&&m(n,"tinro-ignore"),c=r.ctrlKey||r.metaKey||r.altKey||r.shiftKey;if(t=="_self"&&!s&&!c&&n){let o=n.getAttribute("href").replace(/^\/#/,"");/^\/\/|^#|^[a-zA-Z]+:/.test(o)||(r.preventDefault(),e(o.startsWith("/")?o:n.href.replace(window.location.origin,"")));}};return addEventListener("click",a),()=>removeEventListener("click",a)}function Q(){return getContext("tinro").meta.params}var g="tinro",K=v({pattern:"",matched:!0});function q(e){let a=getContext(g)||K;(a.exact||a.fallback)&&k(`${e.fallback?"<Route fallback>":`<Route path="${e.path}">`}  can't be inside ${a.fallback?"<Route fallback>":`<Route path="${a.path||"/"}"> with exact path`}`);let r=e.fallback?"fallbacks":"childs",n=writable({}),t=v({fallback:e.fallback,parent:a,update(s){t.exact=!s.path.endsWith("/*"),t.pattern=p(`${t.parent.pattern||""}${s.path}`),t.redirect=s.redirect,t.firstmatch=s.firstmatch,t.breadcrumb=s.breadcrumb,t.match();},register:()=>(t.parent[r].add(t),async()=>{t.parent[r].delete(t),t.parent.activeChilds.delete(t),t.router.un&&t.router.un(),t.parent.match();}),show:()=>{e.onShow(),!t.fallback&&t.parent.activeChilds.add(t);},hide:()=>{e.onHide(),t.parent.activeChilds.delete(t);},match:async()=>{t.matched=!1;let{path:s,url:c,from:o,query:h}=t.router.location,u=d(t.pattern,s);if(!t.fallback&&u&&t.redirect&&(!t.exact||t.exact&&u.exact)){let A=x(s,t.parent.pattern,t.redirect);return f.goto(A,!0)}t.meta=u&&{from:o,url:c,query:h,match:u.part,pattern:t.pattern,breadcrumbs:t.parent.meta&&t.parent.meta.breadcrumbs.slice()||[],params:u.params,subscribe:n.subscribe},t.breadcrumb&&t.meta&&t.meta.breadcrumbs.push({name:t.breadcrumb,path:u.part}),n.set(t.meta),u&&!t.fallback&&(!t.exact||t.exact&&u.exact)&&(!t.parent.firstmatch||!t.parent.matched)?(e.onMeta(t.meta),t.parent.matched=!0,t.show()):t.hide(),u&&t.showFallbacks();}});return setContext(g,t),onMount(()=>t.register()),t}function O(){return hasContext(g)?getContext(g).meta:k("meta() function must be run inside any `<Route>` child component only")}function v(e){let a={router:{},exact:!1,pattern:null,meta:null,parent:null,fallback:!1,redirect:!1,firstmatch:!1,breadcrumb:null,matched:!1,childs:new Set,activeChilds:new Set,fallbacks:new Set,async showFallbacks(){if(!this.fallback&&(await tick(),this.childs.size>0&&this.activeChilds.size==0||this.childs.size==0&&this.fallbacks.size>0)){let r=this;for(;r.fallbacks.size==0;)if(r=r.parent,!r)return;r&&r.fallbacks.forEach(n=>{if(n.redirect){let t=x("/",n.parent.pattern,n.redirect);f.goto(t,!0);}else n.show();});}},start(){this.router.un||(this.router.un=f.subscribe(r=>{this.router.location=r,this.pattern!==null&&this.match();}));},match(){this.showFallbacks();}};return Object.assign(a,e),a.start(),a}

    /* node_modules\tinro\cmp\Route.svelte generated by Svelte v3.50.1 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*params*/ 2,
    	meta: dirty & /*meta*/ 4
    });

    const get_default_slot_context = ctx => ({
    	params: /*params*/ ctx[1],
    	meta: /*meta*/ ctx[2]
    });

    // (33:0) {#if showContent}
    function create_if_block(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, params, meta*/ 262)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(33:0) {#if showContent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*showContent*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*showContent*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*showContent*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = '/*' } = $$props;
    	let { fallback = false } = $$props;
    	let { redirect = false } = $$props;
    	let { firstmatch = false } = $$props;
    	let { breadcrumb = null } = $$props;
    	let showContent = false;
    	let params = {}; /* DEPRECATED */
    	let meta = {};

    	const route = q({
    		fallback,
    		onShow() {
    			$$invalidate(0, showContent = true);
    		},
    		onHide() {
    			$$invalidate(0, showContent = false);
    		},
    		onMeta(newmeta) {
    			$$invalidate(2, meta = newmeta);
    			$$invalidate(1, params = meta.params); /* DEPRECATED */
    		}
    	});

    	const writable_props = ['path', 'fallback', 'redirect', 'firstmatch', 'breadcrumb'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Route> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('path' in $$props) $$invalidate(3, path = $$props.path);
    		if ('fallback' in $$props) $$invalidate(4, fallback = $$props.fallback);
    		if ('redirect' in $$props) $$invalidate(5, redirect = $$props.redirect);
    		if ('firstmatch' in $$props) $$invalidate(6, firstmatch = $$props.firstmatch);
    		if ('breadcrumb' in $$props) $$invalidate(7, breadcrumb = $$props.breadcrumb);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createRouteObject: q,
    		path,
    		fallback,
    		redirect,
    		firstmatch,
    		breadcrumb,
    		showContent,
    		params,
    		meta,
    		route
    	});

    	$$self.$inject_state = $$props => {
    		if ('path' in $$props) $$invalidate(3, path = $$props.path);
    		if ('fallback' in $$props) $$invalidate(4, fallback = $$props.fallback);
    		if ('redirect' in $$props) $$invalidate(5, redirect = $$props.redirect);
    		if ('firstmatch' in $$props) $$invalidate(6, firstmatch = $$props.firstmatch);
    		if ('breadcrumb' in $$props) $$invalidate(7, breadcrumb = $$props.breadcrumb);
    		if ('showContent' in $$props) $$invalidate(0, showContent = $$props.showContent);
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    		if ('meta' in $$props) $$invalidate(2, meta = $$props.meta);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*path, redirect, firstmatch, breadcrumb*/ 232) {
    			route.update({ path, redirect, firstmatch, breadcrumb });
    		}
    	};

    	return [
    		showContent,
    		params,
    		meta,
    		path,
    		fallback,
    		redirect,
    		firstmatch,
    		breadcrumb,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			path: 3,
    			fallback: 4,
    			redirect: 5,
    			firstmatch: 6,
    			breadcrumb: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fallback() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fallback(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get redirect() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set redirect(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get firstmatch() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set firstmatch(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get breadcrumb() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set breadcrumb(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\Empty.svelte generated by Svelte v3.50.1 */

    const file$4 = "src\\pages\\Empty.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let span;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			span.textContent = "Under construction...";
    			if (!src_url_equal(img.src, img_src_value = "img/construction.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$4, 4, 4, 96);
    			attr_dev(span, "class", "text-lg font-semibold");
    			add_location(span, file$4, 5, 4, 141);
    			attr_dev(div, "class", "mt-3 flex justify-center items-center gap-2 h-[500px]");
    			add_location(div, file$4, 3, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, span);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Empty', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Empty> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Empty extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Empty",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src\components\Transition.svelte generated by Svelte v3.50.1 */
    const file$3 = "src\\components\\Transition.svelte";

    // (6:0) {#key $router.path}
    function create_key_block(ctx) {
    	let div;
    	let div_intro;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			add_location(div, file$3, 6, 4, 128);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { duration: 300 });
    					div_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_key_block.name,
    		type: "key",
    		source: "(6:0) {#key $router.path}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let previous_key = /*$router*/ ctx[0].path;
    	let key_block_anchor;
    	let current;
    	let key_block = create_key_block(ctx);

    	const block = {
    		c: function create() {
    			key_block.c();
    			key_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			key_block.m(target, anchor);
    			insert_dev(target, key_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$router*/ 1 && safe_not_equal(previous_key, previous_key = /*$router*/ ctx[0].path)) {
    				group_outros();
    				transition_out(key_block, 1, 1, noop);
    				check_outros();
    				key_block = create_key_block(ctx);
    				key_block.c();
    				transition_in(key_block, 1);
    				key_block.m(key_block_anchor.parentNode, key_block_anchor);
    			} else {
    				key_block.p(ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(key_block_anchor);
    			key_block.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $router;
    	validate_store(f, 'router');
    	component_subscribe($$self, f, $$value => $$invalidate(0, $router = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Transition', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Transition> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ router: f, fade, $router });
    	return [$router, $$scope, slots];
    }

    class Transition extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Transition",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\VerticalCard.svelte generated by Svelte v3.50.1 */

    const file$2 = "src\\components\\VerticalCard.svelte";

    function create_fragment$2(ctx) {
    	let div2;
    	let div0;
    	let h1;
    	let t0;
    	let t1;
    	let div1;
    	let iframe;
    	let iframe_src_value;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text(/*name*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			iframe = element("iframe");
    			attr_dev(h1, "class", "text-box font-semibold");
    			add_location(h1, file$2, 9, 8, 227);
    			attr_dev(div0, "class", "flex flex-col items-start justify-between mx-3 my-3");
    			add_location(div0, file$2, 8, 4, 152);
    			attr_dev(iframe, "class", "w-full aspect-square");
    			if (!src_url_equal(iframe.src, iframe_src_value = "https://www.youtube.com/embed/" + /*link*/ ctx[1] + "?playlist=" + /*link*/ ctx[1] + "&loop=1&theme=light&color=white&autoplay=1&keyboard=1&autohide=2&modestbranding=1&fs=0&showinfo=0&controls=0&rel=0&mute=1&enablejsapi=1")) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "frameborder", "0");
    			add_location(iframe, file$2, 12, 12, 334);
    			attr_dev(div1, "class", "card box-border");
    			add_location(div1, file$2, 11, 4, 291);
    			attr_dev(div2, "class", "flex flex-col black-outline");
    			add_location(div2, file$2, 7, 0, 105);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, iframe);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);

    			if (dirty & /*link*/ 2 && !src_url_equal(iframe.src, iframe_src_value = "https://www.youtube.com/embed/" + /*link*/ ctx[1] + "?playlist=" + /*link*/ ctx[1] + "&loop=1&theme=light&color=white&autoplay=1&keyboard=1&autohide=2&modestbranding=1&fs=0&showinfo=0&controls=0&rel=0&mute=1&enablejsapi=1")) {
    				attr_dev(iframe, "src", iframe_src_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('VerticalCard', slots, []);
    	let { name } = $$props;
    	let { link } = $$props;
    	const writable_props = ['name', 'link'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<VerticalCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('link' in $$props) $$invalidate(1, link = $$props.link);
    	};

    	$$self.$capture_state = () => ({ name, link });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('link' in $$props) $$invalidate(1, link = $$props.link);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, link];
    }

    class VerticalCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { name: 0, link: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VerticalCard",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<VerticalCard> was created without expected prop 'name'");
    		}

    		if (/*link*/ ctx[1] === undefined && !('link' in props)) {
    			console.warn("<VerticalCard> was created without expected prop 'link'");
    		}
    	}

    	get name() {
    		throw new Error("<VerticalCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<VerticalCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<VerticalCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<VerticalCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\Shaders.svelte generated by Svelte v3.50.1 */
    const file$1 = "src\\pages\\Shaders.svelte";

    function create_fragment$1(ctx) {
    	let div2;
    	let div0;
    	let a;
    	let t1;
    	let h1;
    	let t3;
    	let div1;
    	let verticalcard0;
    	let t4;
    	let verticalcard1;
    	let t5;
    	let verticalcard2;
    	let t6;
    	let verticalcard3;
    	let current;

    	verticalcard0 = new VerticalCard({
    			props: {
    				name: "Procedural Background",
    				link: "aag4C4sQ-DQ"
    			},
    			$$inline: true
    		});

    	verticalcard1 = new VerticalCard({
    			props: {
    				name: "Swirly Blackhole",
    				link: "Hg3VU2-0nPU"
    			},
    			$$inline: true
    		});

    	verticalcard2 = new VerticalCard({
    			props: {
    				name: "World Completion",
    				link: "H1MdlJ9X_LI"
    			},
    			$$inline: true
    		});

    	verticalcard3 = new VerticalCard({
    			props: { name: "Bubble Line", link: "5Bmkd89Hrts" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			a = element("a");
    			a.textContent = "Constellations";
    			t1 = space();
    			h1 = element("h1");
    			h1.textContent = "shaders";
    			t3 = space();
    			div1 = element("div");
    			create_component(verticalcard0.$$.fragment);
    			t4 = space();
    			create_component(verticalcard1.$$.fragment);
    			t5 = space();
    			create_component(verticalcard2.$$.fragment);
    			t6 = space();
    			create_component(verticalcard3.$$.fragment);
    			attr_dev(a, "class", "highlight-text-big underline");
    			attr_dev(a, "href", "https://store.steampowered.com/app/1819520/Constellations_Puzzles_in_the_Sky/");
    			add_location(a, file$1, 6, 8, 174);
    			attr_dev(h1, "class", "highlight-text-big");
    			add_location(h1, file$1, 7, 8, 327);
    			attr_dev(div0, "class", "flex gap-2");
    			add_location(div0, file$1, 5, 4, 140);
    			attr_dev(div1, "class", "pt-4 self-stretch grid grid-cols-2 gap-8");
    			add_location(div1, file$1, 10, 4, 394);
    			attr_dev(div2, "class", "pt-6 flex flex-col items-start");
    			add_location(div2, file$1, 4, 0, 90);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, a);
    			append_dev(div0, t1);
    			append_dev(div0, h1);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			mount_component(verticalcard0, div1, null);
    			append_dev(div1, t4);
    			mount_component(verticalcard1, div1, null);
    			append_dev(div1, t5);
    			mount_component(verticalcard2, div1, null);
    			append_dev(div1, t6);
    			mount_component(verticalcard3, div1, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(verticalcard0.$$.fragment, local);
    			transition_in(verticalcard1.$$.fragment, local);
    			transition_in(verticalcard2.$$.fragment, local);
    			transition_in(verticalcard3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(verticalcard0.$$.fragment, local);
    			transition_out(verticalcard1.$$.fragment, local);
    			transition_out(verticalcard2.$$.fragment, local);
    			transition_out(verticalcard3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(verticalcard0);
    			destroy_component(verticalcard1);
    			destroy_component(verticalcard2);
    			destroy_component(verticalcard3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Shaders', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Shaders> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ VerticalCard });
    	return [];
    }

    class Shaders extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Shaders",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.50.1 */
    const file = "src\\App.svelte";

    // (18:12) <Route path="/">
    function create_default_slot_4(ctx) {
    	let main;
    	let current;
    	main = new Main({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(main.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(main, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(main.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(main.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(main, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(18:12) <Route path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (21:12) <Route path="/portfolio">
    function create_default_slot_3(ctx) {
    	let empty_1;
    	let current;
    	empty_1 = new Empty({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(empty_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(empty_1, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(empty_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(empty_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(empty_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(21:12) <Route path=\\\"/portfolio\\\">",
    		ctx
    	});

    	return block;
    }

    // (24:12) <Route path="/contact">
    function create_default_slot_2(ctx) {
    	let empty_1;
    	let current;
    	empty_1 = new Empty({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(empty_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(empty_1, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(empty_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(empty_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(empty_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(24:12) <Route path=\\\"/contact\\\">",
    		ctx
    	});

    	return block;
    }

    // (27:12) <Route path="/shaders">
    function create_default_slot_1(ctx) {
    	let shaders;
    	let current;
    	shaders = new Shaders({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(shaders.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(shaders, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(shaders.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(shaders.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(shaders, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(27:12) <Route path=\\\"/shaders\\\">",
    		ctx
    	});

    	return block;
    }

    // (17:8) <Transition>
    function create_default_slot(ctx) {
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let t2;
    	let route3;
    	let current;

    	route0 = new Route({
    			props: {
    				path: "/",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: {
    				path: "/portfolio",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route2 = new Route({
    			props: {
    				path: "/contact",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route3 = new Route({
    			props: {
    				path: "/shaders",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    			t2 = space();
    			create_component(route3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(route3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route0_changes.$$scope = { dirty, ctx };
    			}

    			route0.$set(route0_changes);
    			const route1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route1_changes.$$scope = { dirty, ctx };
    			}

    			route1.$set(route1_changes);
    			const route2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route2_changes.$$scope = { dirty, ctx };
    			}

    			route2.$set(route2_changes);
    			const route3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route3_changes.$$scope = { dirty, ctx };
    			}

    			route3.$set(route3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(route3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(17:8) <Transition>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let tailwind;
    	let t0;
    	let main;
    	let header;
    	let t1;
    	let div;
    	let transition;
    	let current;
    	tailwind = new Tailwind({ $$inline: true });
    	header = new Header({ $$inline: true });

    	transition = new Transition({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tailwind.$$.fragment);
    			t0 = space();
    			main = element("main");
    			create_component(header.$$.fragment);
    			t1 = space();
    			div = element("div");
    			create_component(transition.$$.fragment);
    			attr_dev(div, "class", "content pb-8");
    			add_location(div, file, 15, 4, 430);
    			add_location(main, file, 13, 0, 405);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(tailwind, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t1);
    			append_dev(main, div);
    			mount_component(transition, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const transition_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				transition_changes.$$scope = { dirty, ctx };
    			}

    			transition.$set(transition_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tailwind.$$.fragment, local);
    			transition_in(header.$$.fragment, local);
    			transition_in(transition.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tailwind.$$.fragment, local);
    			transition_out(header.$$.fragment, local);
    			transition_out(transition.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tailwind, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(transition);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	f.mode.hash();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Header,
    		Main,
    		Tailwind,
    		Route,
    		router: f,
    		active: Y,
    		Empty,
    		Transition,
    		Shaders
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map