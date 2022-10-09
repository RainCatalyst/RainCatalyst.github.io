
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
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
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
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
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
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                else
                    this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
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
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
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
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
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

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
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
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
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

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap$1(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
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
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.49.0 */

    const { Error: Error_1, Object: Object_1$2, console: console_1 } = globals;

    // (267:0) {:else}
    function create_else_block$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(267:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (260:0) {#if componentParams}
    function create_if_block$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(260:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$3, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(component, userData, ...conditions) {
    	// Use the new wrap method and show a deprecation warning
    	// eslint-disable-next-line no-console
    	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

    	return wrap$1({ component, userData, conditions });
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function pop() {
    	// Execute this code when the current call stack is complete
    	await tick();

    	window.history.back();
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function link(node, opts) {
    	opts = linkOpts(opts);

    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	updateLink(node, opts);

    	return {
    		update(updated) {
    			updated = linkOpts(updated);
    			updateLink(node, updated);
    		}
    	};
    }

    function restoreScroll(state) {
    	// If this exists, then this is a back navigation: restore the scroll position
    	if (state) {
    		window.scrollTo(state.__svelte_spa_router_scrollX, state.__svelte_spa_router_scrollY);
    	} else {
    		// Otherwise this is a forward navigation: scroll to top
    		window.scrollTo(0, 0);
    	}
    }

    // Internal function used by the link function
    function updateLink(node, opts) {
    	let href = opts.href || node.getAttribute('href');

    	// Destination must start with '/' or '#/'
    	if (href && href.charAt(0) == '/') {
    		// Add # to the href attribute
    		href = '#' + href;
    	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
    		throw Error('Invalid value for "href" attribute: ' + href);
    	}

    	node.setAttribute('href', href);

    	node.addEventListener('click', event => {
    		// Prevent default anchor onclick behaviour
    		event.preventDefault();

    		if (!opts.disabled) {
    			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
    		}
    	});
    }

    // Internal function that ensures the argument of the link action is always an object
    function linkOpts(val) {
    	if (val && typeof val == 'string') {
    		return { href: val };
    	} else {
    		return val || {};
    	}
    }

    /**
     * The handler attached to an anchor tag responsible for updating the
     * current history state with the current scroll state
     *
     * @param {string} href - Destination
     */
    function scrollstateHistoryHandler(href) {
    	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined
    	);

    	// This will force an update as desired, but this time our scroll state will be attached
    	window.location.hash = href;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && (event.state.__svelte_spa_router_scrollY || event.state.__svelte_spa_router_scrollX)) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			restoreScroll(previousScrollState);
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	const writable_props = ['routes', 'prefix', 'restoreScrollState'];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		writable,
    		derived,
    		tick,
    		_wrap: wrap$1,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		params,
    		push,
    		pop,
    		replace,
    		link,
    		restoreScroll,
    		updateLink,
    		linkOpts,
    		scrollstateHistoryHandler,
    		onDestroy,
    		createEventDispatcher,
    		afterUpdate,
    		parse,
    		routes,
    		prefix,
    		restoreScrollState,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		props,
    		dispatch,
    		dispatchNextTick,
    		previousScrollState,
    		popStateChanged,
    		lastLoc,
    		componentObj,
    		unsubscribeLoc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    		if ('props' in $$props) $$invalidate(2, props = $$props.props);
    		if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
    		if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
    		if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
    		if ('componentObj' in $$props) componentObj = $$props.componentObj;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get restoreScrollState() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set restoreScrollState(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Tailwind.svelte generated by Svelte v3.49.0 */

    function create_fragment$a(ctx) {
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
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props) {
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
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tailwind",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\components\Button.svelte generated by Svelte v3.49.0 */

    const file$9 = "src\\components\\Button.svelte";

    // (11:4) {:else}
    function create_else_block$2(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "animated-underline");
    			add_location(span, file$9, 11, 8, 264);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(11:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (9:4) {#if pressed}
    function create_if_block$2(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "static-underline");
    			add_location(span, file$9, 9, 8, 203);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(9:4) {#if pressed}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let a;
    	let span;
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*pressed*/ ctx[2]) return create_if_block$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			a = element("a");
    			span = element("span");
    			t0 = text(/*text*/ ctx[0]);
    			t1 = space();
    			if_block.c();
    			add_location(span, file$9, 7, 4, 155);
    			attr_dev(a, "class", "btn group");
    			attr_dev(a, "href", /*href*/ ctx[1]);
    			add_location(a, file$9, 6, 0, 107);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, span);
    			append_dev(span, t0);
    			append_dev(a, t1);
    			if_block.m(a, null);

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*text*/ 1) set_data_dev(t0, /*text*/ ctx[0]);

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(a, null);
    				}
    			}

    			if (dirty & /*href*/ 2) {
    				attr_dev(a, "href", /*href*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if_block.d();
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
    	validate_slots('Button', slots, []);
    	let { text } = $$props;
    	let { href = null } = $$props;
    	let { pressed = false } = $$props;
    	const writable_props = ['text', 'href', 'pressed'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('href' in $$props) $$invalidate(1, href = $$props.href);
    		if ('pressed' in $$props) $$invalidate(2, pressed = $$props.pressed);
    	};

    	$$self.$capture_state = () => ({ text, href, pressed });

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('href' in $$props) $$invalidate(1, href = $$props.href);
    		if ('pressed' in $$props) $$invalidate(2, pressed = $$props.pressed);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text, href, pressed, click_handler];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { text: 0, href: 1, pressed: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*text*/ ctx[0] === undefined && !('text' in props)) {
    			console.warn("<Button> was created without expected prop 'text'");
    		}
    	}

    	get text() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pressed() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pressed(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Navbar.svelte generated by Svelte v3.49.0 */
    const file$8 = "src\\components\\Navbar.svelte";

    // (20:8) {:else}
    function create_else_block$1(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let h40;
    	let t2;
    	let h41;
    	let t4;
    	let h42;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h40 = element("h4");
    			h40.textContent = "FreezedIce";
    			t2 = space();
    			h41 = element("h4");
    			h41.textContent = "/";
    			t4 = space();
    			h42 = element("h4");
    			h42.textContent = "Game Portolfio";
    			attr_dev(img, "class", "h-full");
    			if (!src_url_equal(img.src, img_src_value = "img/logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$8, 23, 24, 932);
    			attr_dev(div0, "class", "w-8 h-8");
    			add_location(div0, file$8, 22, 20, 885);
    			attr_dev(h40, "class", "font-bold text-lg ml-2");
    			add_location(h40, file$8, 29, 20, 1258);
    			attr_dev(h41, "class", "text-md px-2");
    			add_location(h41, file$8, 30, 20, 1330);
    			attr_dev(h42, "class", "font-light text-md");
    			add_location(h42, file$8, 31, 20, 1383);
    			attr_dev(div1, "class", "flex flex-row items-center");
    			add_location(div1, file$8, 21, 16, 823);
    			attr_dev(div2, "class", "flex flex-col justify-center items-center");
    			add_location(div2, file$8, 20, 12, 750);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div1, t0);
    			append_dev(div1, h40);
    			append_dev(div1, t2);
    			append_dev(div1, h41);
    			append_dev(div1, t4);
    			append_dev(div1, h42);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(20:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (12:8) {#if back}
    function create_if_block$1(ctx) {
    	let span1;
    	let h4;
    	let t1;
    	let span0;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			h4 = element("h4");
    			h4.textContent = "Back";
    			t1 = space();
    			span0 = element("span");
    			attr_dev(h4, "class", "font-bold text-lg");
    			add_location(h4, file$8, 16, 16, 597);
    			attr_dev(span0, "class", "animated-underline-low");
    			add_location(span0, file$8, 17, 16, 654);
    			attr_dev(span1, "class", "btn group ml-2");
    			add_location(span1, file$8, 15, 12, 550);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, h4);
    			append_dev(span1, t1);
    			append_dev(span1, span0);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(12:8) {#if back}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let nav;
    	let div;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*back*/ ctx[0]) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "flex justify-start items-center self-stretch cursor-pointer");
    			add_location(div, file$8, 10, 4, 270);
    			attr_dev(nav, "class", "sidebar flex flex-row justify-center items-center");
    			add_location(nav, file$8, 9, 0, 201);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div);
    			if_block.m(div, null);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if_block.d();
    			mounted = false;
    			dispose();
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
    	let back;
    	let $location;
    	validate_store(location, 'location');
    	component_subscribe($$self, location, $$value => $$invalidate(1, $location = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => replace('/');

    	$$self.$capture_state = () => ({
    		Button,
    		replace,
    		location,
    		back,
    		$location
    	});

    	$$self.$inject_state = $$props => {
    		if ('back' in $$props) $$invalidate(0, back = $$props.back);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$location*/ 2) {
    			$$invalidate(0, back = $location != '/');
    		}
    	};

    	return [back, $location, click_handler];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\components\Selector.svelte generated by Svelte v3.49.0 */
    const file$7 = "src\\components\\Selector.svelte";

    function create_fragment$7(ctx) {
    	let nav;
    	let button0;
    	let t0;
    	let h4;
    	let t2;
    	let button1;
    	let current;

    	button0 = new Button({
    			props: {
    				text: "Games",
    				href: "#/",
    				pressed: /*$location*/ ctx[0] == "/"
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				text: "About",
    				href: "#/about",
    				pressed: /*$location*/ ctx[0] == "/about"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			create_component(button0.$$.fragment);
    			t0 = space();
    			h4 = element("h4");
    			h4.textContent = "|";
    			t2 = space();
    			create_component(button1.$$.fragment);
    			attr_dev(h4, "class", "text-md px-2");
    			add_location(h4, file$7, 11, 4, 323);
    			attr_dev(nav, "class", "flex justify-center mb-2 gap-4");
    			add_location(nav, file$7, 9, 0, 204);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			mount_component(button0, nav, null);
    			append_dev(nav, t0);
    			append_dev(nav, h4);
    			append_dev(nav, t2);
    			mount_component(button1, nav, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};
    			if (dirty & /*$location*/ 1) button0_changes.pressed = /*$location*/ ctx[0] == "/";
    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty & /*$location*/ 1) button1_changes.pressed = /*$location*/ ctx[0] == "/about";
    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_component(button0);
    			destroy_component(button1);
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
    	let $location;
    	validate_store(location, 'location');
    	component_subscribe($$self, location, $$value => $$invalidate(0, $location = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Selector', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Selector> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Button, replace, location, $location });
    	return [$location];
    }

    class Selector extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Selector",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
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
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    function collapse (node, params) {

        const defaultParams = {
            open: true,
            duration: 0.2,
            easing: 'ease'
        };

        params = Object.assign(defaultParams, params);

        const noop = () => {};
        let transitionEndResolve = noop;
        let transitionEndReject = noop;

        const listener = node.addEventListener('transitionend', () => {
            transitionEndResolve();
            transitionEndResolve = noop;
            transitionEndReject = noop;
        });

        // convenience functions
        async function asyncTransitionEnd () {
            return new Promise((resolve, reject) => {
                transitionEndResolve = resolve;
                transitionEndReject = reject;
            })
        }

        async function nextFrame () {
            return new Promise(requestAnimationFrame)
        }

        function transition () {
            return `height ${params.duration}s ${params.easing}`
        }

        // set initial styles
        node.style.overflow = 'hidden';
        node.style.transition = transition();
        node.style.height = params.open ? 'auto' : '0px';

        async function enter () {

            // height is already in pixels
            // start the transition
            node.style.height = node.scrollHeight + 'px';

            // wait for transition to end,
            // then switch back to height auto
            try {
                await asyncTransitionEnd();
                node.style.height = 'auto';
            } catch(err) {
                // interrupted by a leave transition
            }

        }

        async function leave () {

            if (node.style.height === 'auto') {

                // temporarily turn transitions off
                node.style.transition = 'none';
                await nextFrame();

                // set height to pixels, and turn transition back on
                node.style.height = node.scrollHeight + 'px';
                node.style.transition = transition();
                await nextFrame();

                // start the transition
                node.style.height = '0px';

            }
            else {

                // we are interrupting an enter transition
                transitionEndReject();
                node.style.height = '0px';

            }

        }

        function update (newParams) {
            params = Object.assign(params, newParams);
            params.open ? enter() : leave();
        }

        function destroy () {
            node.removeEventListener('transitionend', listener);
        }

        return { update, destroy }

    }

    /* node_modules\svelte-collapsible\src\components\Accordion.svelte generated by Svelte v3.49.0 */

    const { Object: Object_1$1 } = globals;
    const file$6 = "node_modules\\svelte-collapsible\\src\\components\\Accordion.svelte";

    function create_fragment$6(ctx) {
    	let ul;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			attr_dev(ul, "class", "accordion svelte-k8862v");
    			add_location(ul, file$6, 34, 0, 829);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
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
    			if (detaching) detach_dev(ul);
    			if (default_slot) default_slot.d(detaching);
    		}
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

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Accordion', slots, ['default']);
    	let { duration = 0.2 } = $$props;
    	let { easing = 'ease' } = $$props;
    	let { key = null } = $$props;
    	const dispatch = createEventDispatcher();

    	// create a store for the children to access
    	const store = writable({ key, duration, easing });

    	// when the store changes, update the key prop
    	const unsubscribe = store.subscribe(s => {
    		$$invalidate(0, key = s.key);
    		dispatch('change', { key });
    	});

    	// make the store available to children
    	setContext('svelte-collapsible-accordion', store);

    	onDestroy(unsubscribe);
    	const writable_props = ['duration', 'easing', 'key'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Accordion> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('duration' in $$props) $$invalidate(1, duration = $$props.duration);
    		if ('easing' in $$props) $$invalidate(2, easing = $$props.easing);
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		setContext,
    		createEventDispatcher,
    		writable,
    		duration,
    		easing,
    		key,
    		dispatch,
    		store,
    		unsubscribe
    	});

    	$$self.$inject_state = $$props => {
    		if ('duration' in $$props) $$invalidate(1, duration = $$props.duration);
    		if ('easing' in $$props) $$invalidate(2, easing = $$props.easing);
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*key*/ 1) {
    			// when the key prop changes, update the store
    			store.update(s => Object.assign(s, { key }));
    		}
    	};

    	return [key, duration, easing, $$scope, slots];
    }

    class Accordion extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { duration: 1, easing: 2, key: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Accordion",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get duration() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set duration(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get easing() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set easing(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-collapsible\src\components\AccordionItem.svelte generated by Svelte v3.49.0 */

    const { Object: Object_1 } = globals;
    const file$5 = "node_modules\\svelte-collapsible\\src\\components\\AccordionItem.svelte";
    const get_body_slot_changes = dirty => ({});
    const get_body_slot_context = ctx => ({});
    const get_header_slot_changes = dirty => ({});
    const get_header_slot_context = ctx => ({});

    function create_fragment$5(ctx) {
    	let li;
    	let div0;
    	let t0;
    	let div1;
    	let collapse_action;
    	let t1;
    	let li_aria_expanded_value;
    	let current;
    	let mounted;
    	let dispose;
    	const header_slot_template = /*#slots*/ ctx[6].header;
    	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[5], get_header_slot_context);
    	const body_slot_template = /*#slots*/ ctx[6].body;
    	const body_slot = create_slot(body_slot_template, ctx, /*$$scope*/ ctx[5], get_body_slot_context);
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			li = element("li");
    			div0 = element("div");
    			if (header_slot) header_slot.c();
    			t0 = space();
    			div1 = element("div");
    			if (body_slot) body_slot.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "accordion-item-header svelte-1tnt0g6");
    			add_location(div0, file$5, 32, 4, 598);
    			attr_dev(div1, "class", "accordion-item-body");
    			add_location(div1, file$5, 36, 4, 705);
    			attr_dev(li, "class", "accordion-item");
    			attr_dev(li, "aria-expanded", li_aria_expanded_value = /*params*/ ctx[0].open);
    			add_location(li, file$5, 30, 0, 537);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div0);

    			if (header_slot) {
    				header_slot.m(div0, null);
    			}

    			append_dev(li, t0);
    			append_dev(li, div1);

    			if (body_slot) {
    				body_slot.m(div1, null);
    			}

    			append_dev(li, t1);

    			if (default_slot) {
    				default_slot.m(li, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*handleToggle*/ ctx[2], false, false, false),
    					action_destroyer(collapse_action = collapse.call(null, div1, /*params*/ ctx[0]))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (header_slot) {
    				if (header_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						header_slot,
    						header_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(header_slot_template, /*$$scope*/ ctx[5], dirty, get_header_slot_changes),
    						get_header_slot_context
    					);
    				}
    			}

    			if (body_slot) {
    				if (body_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						body_slot,
    						body_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(body_slot_template, /*$$scope*/ ctx[5], dirty, get_body_slot_changes),
    						get_body_slot_context
    					);
    				}
    			}

    			if (collapse_action && is_function(collapse_action.update) && dirty & /*params*/ 1) collapse_action.update.call(null, /*params*/ ctx[0]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*params*/ 1 && li_aria_expanded_value !== (li_aria_expanded_value = /*params*/ ctx[0].open)) {
    				attr_dev(li, "aria-expanded", li_aria_expanded_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header_slot, local);
    			transition_in(body_slot, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header_slot, local);
    			transition_out(body_slot, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (header_slot) header_slot.d(detaching);
    			if (body_slot) body_slot.d(detaching);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
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
    	let params;
    	let $store;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AccordionItem', slots, ['header','body','default']);
    	let { key } = $$props;
    	const store = getContext('svelte-collapsible-accordion');
    	validate_store(store, 'store');
    	component_subscribe($$self, store, value => $$invalidate(4, $store = value));

    	function handleToggle() {
    		if (params.open) {
    			store.update(s => Object.assign(s, { key: null }));
    		} else {
    			store.update(s => Object.assign(s, { key }));
    		}
    	}

    	const writable_props = ['key'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AccordionItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(3, key = $$props.key);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		collapse,
    		key,
    		store,
    		handleToggle,
    		params,
    		$store
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(3, key = $$props.key);
    		if ('params' in $$props) $$invalidate(0, params = $$props.params);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$store, key*/ 24) {
    			$$invalidate(0, params = {
    				open: $store.key === key,
    				duration: $store.duration,
    				easing: $store.easing
    			});
    		}
    	};

    	return [params, store, handleToggle, key, $store, $$scope, slots];
    }

    class AccordionItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { key: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AccordionItem",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*key*/ ctx[3] === undefined && !('key' in props)) {
    			console.warn("<AccordionItem> was created without expected prop 'key'");
    		}
    	}

    	get key() {
    		throw new Error("<AccordionItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<AccordionItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var projects = [
    	{
    		card: {
    			title: "Constellations",
    			description: "Minimalist puzzle game about connecting stars",
    			image: "img/constellations/logo.png",
    			hoverImage: "img/constellations/gameplay.mp4"
    		},
    		description: {
    			title: "Constellations",
    			description: "Constellations is a minimalist puzzle game about connecting stars.<br><br>This was a personal year-long project with my friend. I was responsible for all the code and tech art, as well as some level design for the game.<br><br>Constellations is released on <a href='https://store.steampowered.com/app/1819520/Constellations_Puzzles_in_the_Sky/' class='link'>Steam</a> and <a href='https://icedropgames.itch.io/constellationsitch' class='link'>itch.io</a> and is coming to mobile devices soon.",
    			video: "img/constellations/gameplay.mp4",
    			images: [
    				"img/constellations/1.png",
    				"img/constellations/2.png",
    				"img/constellations/3.png"
    			]
    		},
    		meta: {
    			teamSize: 2,
    			engine: "Godot",
    			timeSpan: "1 year"
    		}
    	},
    	{
    		card: {
    			title: "Retro Rift",
    			description: "Fast-paced platformer with time travel mechanics",
    			image: "img/retrorift/logo.png",
    			hoverImage: "img/retrorift/gameplay.mp4"
    		},
    		description: {
    			title: "Retro Rift",
    			description: "Retro rift is a fast-paced precision platformer with time travel mechanics.<br><br>This was a week-long project I made in collaboration with my friend. I was behind the game’s movement code and designed most of the levels.<br><br>The game has received the 9th place (out of nearly 1800 entires) at <a href='https://itch.io/jam/brackeys-4/rate/719663' class='link'>Brackeys Jam 2020.2</a>.",
    			contribution: "This was a week-long project I made in collaboration with my friend. I was behind game’s movement code and designed most of the levels.",
    			video: "img/retrorift/gameplay.mp4",
    			images: [
    				"img/retrorift/1.png",
    				"img/retrorift/2.png",
    				"img/retrorift/3.png"
    			]
    		},
    		meta: {
    			teamSize: 2,
    			engine: "Godot",
    			timeSpan: "2 weeks"
    		}
    	},
    	{
    		card: {
    			title: "Sneks",
    			description: "Classic snakes meets Rush Hour",
    			image: "img/sneks/logo.png",
    			hoverImage: "img/sneks/gameplay.mp4"
    		},
    		description: {
    			title: "Sneks",
    			description: "Sneks is a cute puzzle inspired by the classic snake game.<br><br>Sneks was made over the month-long <a href='https://itch.io/jam/godot-wild-jam-45/rate/1536621' class='link'>Godot Wild Jam #45</a>. I was responsible for the game’s internal logic and smooth line rendering for snakes, as well as helped design some levels and mechanics.",
    			video: "img/sneks/gameplay.mp4",
    			images: [
    				"img/sneks/1.png",
    				"img/sneks/2.png",
    				"img/sneks/3.png"
    			]
    		},
    		meta: {
    			teamSize: 2,
    			engine: "Godot",
    			timeSpan: "2 weeks"
    		}
    	},
    	{
    		card: {
    			title: "Flip'n Seas",
    			description: "Tile flipping nautical puzzle",
    			image: "img/flipseas/logo.png",
    			hoverImage: "img/flipseas/gameplay.mp4"
    		},
    		description: {
    			title: "Flip'n Seas",
    			description: "Flip’n Seas is a tactile puzzle about flipping tiles to lead your ship to a treasure.<br><br>This is a personal project, I was responsible for all aspects of the game, except for the tile art.<br>You find out more on the <a href='https://itch.io/jam/godot-wild-jam-45/rate/1536621' class='link'>game's page</a>.",
    			video: "img/flipseas/gameplay.mp4",
    			images: [
    				"img/flipseas/1.png",
    				"img/flipseas/2.png"
    			]
    		},
    		meta: {
    			teamSize: 2,
    			engine: "Unity",
    			timeSpan: "4 weeks"
    		}
    	},
    	{
    		card: {
    			title: "Tree Golf",
    			description: "Relaxing golf game",
    			image: "img/treegolf/logo.png",
    			hoverImage: "img/treegolf/gameplay.mp4"
    		},
    		description: {
    			title: "Tree Golf",
    			description: "...",
    			video: "img/treegolf/gameplay.mp4",
    			images: [
    				"img/treegolf/1.png",
    				"img/treegolf/2.png"
    			]
    		},
    		meta: {
    			teamSize: 2,
    			engine: "Godot",
    			timeSpan: "1 week"
    		}
    	},
    	{
    		card: {
    			title: "Other Games",
    			description: "Games from gamejams and personal projects",
    			image: "img/other/logo.png",
    			hoverImage: "img/other/logo.png"
    		},
    		description: {
    			title: "Other Games",
    			description: "...",
    			video: "-",
    			images: [
    				"-",
    				"-"
    			]
    		},
    		meta: {
    			teamSize: "1-4",
    			engine: "Mixed",
    			timeSpan: "3 years"
    		}
    	}
    ];

    const cards = projects.map(x => x.card);
    const descriptions = projects.map(x => x.description);
    const metas = projects.map(x => x.meta);

    /* src\routes\ProjectDescription.svelte generated by Svelte v3.49.0 */
    const file$4 = "src\\routes\\ProjectDescription.svelte";

    // (61:16) 
    function create_header_slot_1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "Programming";
    			attr_dev(div, "slot", "header");
    			attr_dev(div, "class", "collapse-header");
    			add_location(div, file$4, 60, 16, 2679);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_header_slot_1.name,
    		type: "slot",
    		source: "(61:16) ",
    		ctx
    	});

    	return block;
    }

    // (65:16) 
    function create_body_slot_1(ctx) {
    	let div1;
    	let div0;
    	let raw_value = /*project*/ ctx[0].description + "";

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", "mx-3");
    			add_location(div0, file$4, 65, 20, 2953);
    			attr_dev(div1, "slot", "body");
    			attr_dev(div1, "class", "self-stretch mt-3");
    			add_location(div1, file$4, 64, 16, 2888);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			div0.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*project*/ 1 && raw_value !== (raw_value = /*project*/ ctx[0].description + "")) div0.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_1.name,
    		type: "slot",
    		source: "(65:16) ",
    		ctx
    	});

    	return block;
    }

    // (72:16) 
    function create_header_slot(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "Design";
    			attr_dev(div, "slot", "header");
    			attr_dev(div, "class", "collapse-header");
    			add_location(div, file$4, 71, 16, 3161);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_header_slot.name,
    		type: "slot",
    		source: "(72:16) ",
    		ctx
    	});

    	return block;
    }

    // (76:16) 
    function create_body_slot(ctx) {
    	let div1;
    	let div0;
    	let raw_value = /*project*/ ctx[0].description + "";

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", "mx-3");
    			add_location(div0, file$4, 76, 20, 3430);
    			attr_dev(div1, "slot", "body");
    			attr_dev(div1, "class", "self-stretch mt-3");
    			add_location(div1, file$4, 75, 16, 3365);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			div0.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*project*/ 1 && raw_value !== (raw_value = /*project*/ ctx[0].description + "")) div0.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot.name,
    		type: "slot",
    		source: "(76:16) ",
    		ctx
    	});

    	return block;
    }

    // (59:8) <Accordion>
    function create_default_slot(ctx) {
    	let accordionitem0;
    	let t;
    	let accordionitem1;
    	let current;

    	accordionitem0 = new AccordionItem({
    			props: {
    				key: "a",
    				$$slots: {
    					body: [create_body_slot_1],
    					header: [create_header_slot_1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	accordionitem1 = new AccordionItem({
    			props: {
    				key: "b",
    				$$slots: {
    					body: [create_body_slot],
    					header: [create_header_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(accordionitem0.$$.fragment);
    			t = space();
    			create_component(accordionitem1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(accordionitem0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(accordionitem1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const accordionitem0_changes = {};

    			if (dirty & /*$$scope, project*/ 65) {
    				accordionitem0_changes.$$scope = { dirty, ctx };
    			}

    			accordionitem0.$set(accordionitem0_changes);
    			const accordionitem1_changes = {};

    			if (dirty & /*$$scope, project*/ 65) {
    				accordionitem1_changes.$$scope = { dirty, ctx };
    			}

    			accordionitem1.$set(accordionitem1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(accordionitem0.$$.fragment, local);
    			transition_in(accordionitem1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(accordionitem0.$$.fragment, local);
    			transition_out(accordionitem1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(accordionitem0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(accordionitem1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(59:8) <Accordion>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div5;
    	let div4;
    	let h40;
    	let t0_value = /*project*/ ctx[0].title + "";
    	let t0;
    	let t1;
    	let div0;
    	let video;
    	let video_src_value;
    	let t2;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t3;
    	let h41;
    	let t4;
    	let b0;
    	let t5_value = /*meta*/ ctx[1].teamSize + "";
    	let t5;
    	let t6;
    	let img1;
    	let img1_src_value;
    	let t7;
    	let h42;
    	let t8;
    	let b1;
    	let t9_value = /*meta*/ ctx[1].engine + "";
    	let t9;
    	let t10;
    	let img2;
    	let img2_src_value;
    	let t11;
    	let h43;
    	let t12;
    	let b2;
    	let t13_value = /*meta*/ ctx[1].timeSpan + "";
    	let t13;
    	let t14;
    	let div3;
    	let div2;
    	let h44;
    	let t16;
    	let html_tag;
    	let raw_value = /*project*/ ctx[0].description + "";
    	let t17;
    	let accordion;
    	let div5_intro;
    	let current;

    	accordion = new Accordion({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			h40 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			video = element("video");
    			t2 = space();
    			div1 = element("div");
    			img0 = element("img");
    			t3 = space();
    			h41 = element("h4");
    			t4 = text("Team Size: ");
    			b0 = element("b");
    			t5 = text(t5_value);
    			t6 = space();
    			img1 = element("img");
    			t7 = space();
    			h42 = element("h4");
    			t8 = text("Game Engine: ");
    			b1 = element("b");
    			t9 = text(t9_value);
    			t10 = space();
    			img2 = element("img");
    			t11 = space();
    			h43 = element("h4");
    			t12 = text("Time Frame: ");
    			b2 = element("b");
    			t13 = text(t13_value);
    			t14 = space();
    			div3 = element("div");
    			div2 = element("div");
    			h44 = element("h4");
    			h44.textContent = "About";
    			t16 = space();
    			html_tag = new HtmlTag(false);
    			t17 = space();
    			create_component(accordion.$$.fragment);
    			attr_dev(h40, "class", "font-bold text-2xl");
    			add_location(h40, file$4, 26, 8, 869);
    			if (!src_url_equal(video.src, video_src_value = /*project*/ ctx[0].video)) attr_dev(video, "src", video_src_value);
    			attr_dev(video, "class", "w-full object-contain");
    			video.autoplay = true;
    			video.muted = true;
    			video.loop = true;
    			add_location(video, file$4, 28, 12, 993);
    			attr_dev(div0, "class", "card self-stretch aspect-video mt-4");
    			add_location(div0, file$4, 27, 8, 930);
    			if (!src_url_equal(img0.src, img0_src_value = "img/icons/people2.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "w-3 h-3 mr-1");
    			attr_dev(img0, "alt", "Team Size");
    			add_location(img0, file$4, 31, 12, 1198);
    			add_location(b0, file$4, 32, 56, 1326);
    			attr_dev(h41, "class", "metadata-description");
    			add_location(h41, file$4, 32, 12, 1282);
    			if (!src_url_equal(img1.src, img1_src_value = "img/icons/tools.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "w-2.5 h-2.5 mr-1 ml-4");
    			attr_dev(img1, "alt", "Engine");
    			add_location(img1, file$4, 33, 12, 1367);
    			add_location(b1, file$4, 34, 58, 1501);
    			attr_dev(h42, "class", "metadata-description");
    			add_location(h42, file$4, 34, 12, 1455);
    			if (!src_url_equal(img2.src, img2_src_value = "img/icons/clock4.svg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "class", "w-[0.6875rem] h-[0.6875rem] mr-1 ml-4");
    			attr_dev(img2, "alt", "Duration");
    			add_location(img2, file$4, 35, 12, 1540);
    			add_location(b2, file$4, 36, 57, 1692);
    			attr_dev(h43, "class", "metadata-description");
    			add_location(h43, file$4, 36, 12, 1647);
    			attr_dev(div1, "class", "bg-primary self-stretch h-8 flex items-center shadow-md px-4 -mt-5");
    			add_location(div1, file$4, 30, 8, 1104);
    			attr_dev(h44, "class", "collapse-header mb-3");
    			add_location(h44, file$4, 40, 16, 1832);
    			html_tag.a = null;
    			attr_dev(div2, "class", "mx-3");
    			add_location(div2, file$4, 39, 12, 1796);
    			attr_dev(div3, "class", "text-block self-stretch");
    			add_location(div3, file$4, 38, 8, 1745);
    			attr_dev(div4, "class", "flex flex-col justify-start items-center w-full lg:w-1/2");
    			add_location(div4, file$4, 25, 4, 789);
    			attr_dev(div5, "class", "flex justify-center");
    			add_location(div5, file$4, 24, 0, 716);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, h40);
    			append_dev(h40, t0);
    			append_dev(div4, t1);
    			append_dev(div4, div0);
    			append_dev(div0, video);
    			append_dev(div4, t2);
    			append_dev(div4, div1);
    			append_dev(div1, img0);
    			append_dev(div1, t3);
    			append_dev(div1, h41);
    			append_dev(h41, t4);
    			append_dev(h41, b0);
    			append_dev(b0, t5);
    			append_dev(div1, t6);
    			append_dev(div1, img1);
    			append_dev(div1, t7);
    			append_dev(div1, h42);
    			append_dev(h42, t8);
    			append_dev(h42, b1);
    			append_dev(b1, t9);
    			append_dev(div1, t10);
    			append_dev(div1, img2);
    			append_dev(div1, t11);
    			append_dev(div1, h43);
    			append_dev(h43, t12);
    			append_dev(h43, b2);
    			append_dev(b2, t13);
    			append_dev(div4, t14);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, h44);
    			append_dev(div2, t16);
    			html_tag.m(raw_value, div2);
    			append_dev(div4, t17);
    			mount_component(accordion, div4, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*project*/ 1) && t0_value !== (t0_value = /*project*/ ctx[0].title + "")) set_data_dev(t0, t0_value);

    			if (!current || dirty & /*project*/ 1 && !src_url_equal(video.src, video_src_value = /*project*/ ctx[0].video)) {
    				attr_dev(video, "src", video_src_value);
    			}

    			if ((!current || dirty & /*meta*/ 2) && t5_value !== (t5_value = /*meta*/ ctx[1].teamSize + "")) set_data_dev(t5, t5_value);
    			if ((!current || dirty & /*meta*/ 2) && t9_value !== (t9_value = /*meta*/ ctx[1].engine + "")) set_data_dev(t9, t9_value);
    			if ((!current || dirty & /*meta*/ 2) && t13_value !== (t13_value = /*meta*/ ctx[1].timeSpan + "")) set_data_dev(t13, t13_value);
    			if ((!current || dirty & /*project*/ 1) && raw_value !== (raw_value = /*project*/ ctx[0].description + "")) html_tag.p(raw_value);
    			const accordion_changes = {};

    			if (dirty & /*$$scope, project*/ 65) {
    				accordion_changes.$$scope = { dirty, ctx };
    			}

    			accordion.$set(accordion_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(accordion.$$.fragment, local);

    			if (!div5_intro) {
    				add_render_callback(() => {
    					div5_intro = create_in_transition(div5, fly, { y: 15, duration: 250 });
    					div5_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(accordion.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			destroy_component(accordion);
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

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProjectDescription', slots, []);
    	let { project = {} } = $$props;
    	let { meta = {} } = $$props;
    	let { params = {} } = $$props;
    	project = descriptions[params.index];
    	meta = metas[params.index];
    	let programming = true;

    	function openProgramming() {
    		programming = true;
    	}

    	function openDesign() {
    		programming = false;
    	}

    	const writable_props = ['project', 'meta', 'params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProjectDescription> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('project' in $$props) $$invalidate(0, project = $$props.project);
    		if ('meta' in $$props) $$invalidate(1, meta = $$props.meta);
    		if ('params' in $$props) $$invalidate(2, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		project,
    		meta,
    		params,
    		fly,
    		Accordion,
    		AccordionItem,
    		descriptions,
    		metas,
    		Button,
    		onMount,
    		programming,
    		openProgramming,
    		openDesign
    	});

    	$$self.$inject_state = $$props => {
    		if ('project' in $$props) $$invalidate(0, project = $$props.project);
    		if ('meta' in $$props) $$invalidate(1, meta = $$props.meta);
    		if ('params' in $$props) $$invalidate(2, params = $$props.params);
    		if ('programming' in $$props) programming = $$props.programming;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [project, meta, params];
    }

    class ProjectDescription extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { project: 0, meta: 1, params: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectDescription",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get project() {
    		throw new Error("<ProjectDescription>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set project(value) {
    		throw new Error("<ProjectDescription>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get meta() {
    		throw new Error("<ProjectDescription>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set meta(value) {
    		throw new Error("<ProjectDescription>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get params() {
    		throw new Error("<ProjectDescription>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<ProjectDescription>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\routes\About.svelte generated by Svelte v3.49.0 */
    const file$3 = "src\\routes\\About.svelte";

    function create_fragment$3(ctx) {
    	let div3;
    	let div2;
    	let h4;
    	let t1;
    	let div1;
    	let div0;
    	let t2;
    	let br0;
    	let t3;
    	let br1;
    	let t4;
    	let div3_intro;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			h4 = element("h4");
    			h4.textContent = "About";
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t2 = text("Hi! I'm Arseny (FreezedIce on the web).\r\n                ");
    			br0 = element("br");
    			t3 = space();
    			br1 = element("br");
    			t4 = text("\r\n                I like making fun small games and I actively participate in game jams around the world.");
    			attr_dev(h4, "class", "font-bold text-2xl");
    			add_location(h4, file$3, 6, 8, 267);
    			add_location(br0, file$3, 10, 16, 454);
    			add_location(br1, file$3, 14, 16, 725);
    			attr_dev(div0, "class", "mr-4 ml-1");
    			add_location(div0, file$3, 8, 12, 356);
    			attr_dev(div1, "class", "text-block");
    			add_location(div1, file$3, 7, 8, 318);
    			attr_dev(div2, "class", "flex flex-col justify-start items-start gap-5 basis-3/4 md:basis-3/5");
    			add_location(div2, file$3, 5, 4, 175);
    			attr_dev(div3, "class", "flex flex-row justify-start items-start gap-5 w-full");
    			add_location(div3, file$3, 4, 0, 69);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, h4);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t2);
    			append_dev(div0, br0);
    			append_dev(div0, t3);
    			append_dev(div0, br1);
    			append_dev(div0, t4);
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!div3_intro) {
    				add_render_callback(() => {
    					div3_intro = create_in_transition(div3, fly, { y: 15, duration: 250 });
    					div3_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ fly });
    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\ProjectCard.svelte generated by Svelte v3.49.0 */
    const file$2 = "src\\components\\ProjectCard.svelte";

    // (24:4) {:else}
    function create_else_block(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*image*/ ctx[2])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "w-full aspect-video object-cover");
    			add_location(img, file$2, 24, 8, 809);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*image*/ 4 && !src_url_equal(img.src, img_src_value = /*image*/ ctx[2])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(24:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (22:4) {#if hovered }
    function create_if_block(ctx) {
    	let video;
    	let video_src_value;

    	const block = {
    		c: function create() {
    			video = element("video");
    			if (!src_url_equal(video.src, video_src_value = /*hoverImage*/ ctx[3])) attr_dev(video, "src", video_src_value);
    			attr_dev(video, "class", "w-full aspect-video object-cover");
    			video.autoplay = true;
    			video.muted = true;
    			video.loop = true;
    			add_location(video, file$2, 22, 8, 692);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, video, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*hoverImage*/ 8 && !src_url_equal(video.src, video_src_value = /*hoverImage*/ ctx[3])) {
    				attr_dev(video, "src", video_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(video);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(22:4) {#if hovered }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div3;
    	let t0;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let h40;
    	let t2_value = /*meta*/ ctx[4].teamSize + "";
    	let t2;
    	let t3;
    	let img1;
    	let img1_src_value;
    	let t4;
    	let h41;
    	let t5_value = /*meta*/ ctx[4].engine + "";
    	let t5;
    	let t6;
    	let img2;
    	let img2_src_value;
    	let t7;
    	let h42;
    	let t8_value = /*meta*/ ctx[4].timeSpan + "";
    	let t8;
    	let t9;
    	let div2;
    	let div1;
    	let span0;
    	let t10;
    	let t11;
    	let span1;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*hovered*/ ctx[5]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			if_block.c();
    			t0 = space();
    			div0 = element("div");
    			img0 = element("img");
    			t1 = space();
    			h40 = element("h4");
    			t2 = text(t2_value);
    			t3 = space();
    			img1 = element("img");
    			t4 = space();
    			h41 = element("h4");
    			t5 = text(t5_value);
    			t6 = space();
    			img2 = element("img");
    			t7 = space();
    			h42 = element("h4");
    			t8 = text(t8_value);
    			t9 = space();
    			div2 = element("div");
    			div1 = element("div");
    			span0 = element("span");
    			t10 = text(/*title*/ ctx[0]);
    			t11 = space();
    			span1 = element("span");
    			if (!src_url_equal(img0.src, img0_src_value = "img/icons/people2.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "w-3 h-3 mr-1");
    			attr_dev(img0, "alt", "Team Size");
    			add_location(img0, file$2, 38, 8, 1510);
    			attr_dev(h40, "class", "metadata-description");
    			add_location(h40, file$2, 39, 8, 1590);
    			if (!src_url_equal(img1.src, img1_src_value = "img/icons/tools.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "w-2.5 h-2.5 mr-1 ml-4");
    			attr_dev(img1, "alt", "Engine");
    			add_location(img1, file$2, 40, 8, 1653);
    			attr_dev(h41, "class", "metadata-description");
    			add_location(h41, file$2, 41, 8, 1737);
    			if (!src_url_equal(img2.src, img2_src_value = "img/icons/clock4.svg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "class", "w-[0.6875rem] h-[0.6875rem] mr-1 ml-4");
    			attr_dev(img2, "alt", "Duration");
    			add_location(img2, file$2, 42, 8, 1798);
    			attr_dev(h42, "class", "metadata-description");
    			add_location(h42, file$2, 43, 8, 1901);
    			attr_dev(div0, "class", "bg-primary w-full h-8 flex items-center shadow-md px-4");
    			add_location(div0, file$2, 37, 4, 1432);
    			attr_dev(span0, "class", "font-bold mr-3");
    			add_location(span0, file$2, 47, 12, 2055);
    			attr_dev(div1, "class", "flex items-center");
    			add_location(div1, file$2, 46, 8, 2010);
    			attr_dev(span1, "class", "block text-secondary text-sm");
    			add_location(span1, file$2, 49, 8, 2124);
    			attr_dev(div2, "class", "mx-4 mb-4 mt-3");
    			add_location(div2, file$2, 45, 4, 1972);
    			attr_dev(div3, "class", "card-animated");
    			add_location(div3, file$2, 19, 0, 480);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			if_block.m(div3, null);
    			append_dev(div3, t0);
    			append_dev(div3, div0);
    			append_dev(div0, img0);
    			append_dev(div0, t1);
    			append_dev(div0, h40);
    			append_dev(h40, t2);
    			append_dev(div0, t3);
    			append_dev(div0, img1);
    			append_dev(div0, t4);
    			append_dev(div0, h41);
    			append_dev(h41, t5);
    			append_dev(div0, t6);
    			append_dev(div0, img2);
    			append_dev(div0, t7);
    			append_dev(div0, h42);
    			append_dev(h42, t8);
    			append_dev(div3, t9);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, span0);
    			append_dev(span0, t10);
    			append_dev(div2, t11);
    			append_dev(div2, span1);
    			span1.innerHTML = /*description*/ ctx[1];

    			if (!mounted) {
    				dispose = [
    					listen_dev(div3, "click", /*select*/ ctx[8], false, false, false),
    					listen_dev(div3, "mouseenter", /*onHover*/ ctx[6], false, false, false),
    					listen_dev(div3, "mouseleave", /*onDehover*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div3, t0);
    				}
    			}

    			if (dirty & /*meta*/ 16 && t2_value !== (t2_value = /*meta*/ ctx[4].teamSize + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*meta*/ 16 && t5_value !== (t5_value = /*meta*/ ctx[4].engine + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*meta*/ 16 && t8_value !== (t8_value = /*meta*/ ctx[4].timeSpan + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*title*/ 1) set_data_dev(t10, /*title*/ ctx[0]);
    			if (dirty & /*description*/ 2) span1.innerHTML = /*description*/ ctx[1];		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
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
    	validate_slots('ProjectCard', slots, []);
    	let { title } = $$props;
    	let { description } = $$props;
    	let { image } = $$props;
    	let { hoverImage } = $$props;
    	let { meta } = $$props;
    	let { index } = $$props;
    	let currentImage = image;
    	let hovered = false;

    	function onHover() {
    		$$invalidate(5, hovered = true);
    	}

    	function onDehover() {
    		$$invalidate(5, hovered = false);
    	}

    	function select() {
    		replace('/project/' + index);
    	}
    	const writable_props = ['title', 'description', 'image', 'hoverImage', 'meta', 'index'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProjectCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    		if ('image' in $$props) $$invalidate(2, image = $$props.image);
    		if ('hoverImage' in $$props) $$invalidate(3, hoverImage = $$props.hoverImage);
    		if ('meta' in $$props) $$invalidate(4, meta = $$props.meta);
    		if ('index' in $$props) $$invalidate(9, index = $$props.index);
    	};

    	$$self.$capture_state = () => ({
    		title,
    		description,
    		image,
    		hoverImage,
    		meta,
    		index,
    		replace,
    		fade,
    		currentImage,
    		hovered,
    		onHover,
    		onDehover,
    		select
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    		if ('image' in $$props) $$invalidate(2, image = $$props.image);
    		if ('hoverImage' in $$props) $$invalidate(3, hoverImage = $$props.hoverImage);
    		if ('meta' in $$props) $$invalidate(4, meta = $$props.meta);
    		if ('index' in $$props) $$invalidate(9, index = $$props.index);
    		if ('currentImage' in $$props) currentImage = $$props.currentImage;
    		if ('hovered' in $$props) $$invalidate(5, hovered = $$props.hovered);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		title,
    		description,
    		image,
    		hoverImage,
    		meta,
    		hovered,
    		onHover,
    		onDehover,
    		select,
    		index
    	];
    }

    class ProjectCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			title: 0,
    			description: 1,
    			image: 2,
    			hoverImage: 3,
    			meta: 4,
    			index: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectCard",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'title'");
    		}

    		if (/*description*/ ctx[1] === undefined && !('description' in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'description'");
    		}

    		if (/*image*/ ctx[2] === undefined && !('image' in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'image'");
    		}

    		if (/*hoverImage*/ ctx[3] === undefined && !('hoverImage' in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'hoverImage'");
    		}

    		if (/*meta*/ ctx[4] === undefined && !('meta' in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'meta'");
    		}

    		if (/*index*/ ctx[9] === undefined && !('index' in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'index'");
    		}
    	}

    	get title() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get image() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hoverImage() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hoverImage(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get meta() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set meta(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get index() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\routes\Showcase.svelte generated by Svelte v3.49.0 */
    const file$1 = "src\\routes\\Showcase.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	child_ctx[2] = i;
    	return child_ctx;
    }

    // (18:8) {#each cards as card, i}
    function create_each_block(ctx) {
    	let projectcard;
    	let current;
    	const projectcard_spread_levels = [/*card*/ ctx[0], { meta: metas[/*i*/ ctx[2]] }, { index: /*i*/ ctx[2] }];
    	let projectcard_props = {};

    	for (let i = 0; i < projectcard_spread_levels.length; i += 1) {
    		projectcard_props = assign(projectcard_props, projectcard_spread_levels[i]);
    	}

    	projectcard = new ProjectCard({ props: projectcard_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(projectcard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(projectcard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const projectcard_changes = (dirty & /*cards, metas*/ 0)
    			? get_spread_update(projectcard_spread_levels, [
    					dirty & /*cards*/ 0 && get_spread_object(/*card*/ ctx[0]),
    					dirty & /*metas*/ 0 && { meta: metas[/*i*/ ctx[2]] },
    					projectcard_spread_levels[2]
    				])
    			: {};

    			projectcard.$set(projectcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(projectcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(projectcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(projectcard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(18:8) {#each cards as card, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let div1_intro;
    	let current;
    	let each_value = cards;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "mt-2 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
    			add_location(div0, file$1, 16, 4, 571);
    			attr_dev(div1, "class", "flex flex-col items-center");
    			add_location(div1, file$1, 13, 0, 350);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*cards, metas*/ 0) {
    				each_value = cards;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			if (!div1_intro) {
    				add_render_callback(() => {
    					div1_intro = create_in_transition(div1, fly, { y: 15, duration: 250 });
    					div1_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
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
    	validate_slots('Showcase', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Showcase> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ ProjectCard, fly, cards, metas, onMount });
    	return [];
    }

    class Showcase extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Showcase",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.49.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let tailwindcss;
    	let t0;
    	let main;
    	let div1;
    	let navbar;
    	let t1;
    	let div0;
    	let router;
    	let current;
    	tailwindcss = new Tailwind({ $$inline: true });
    	navbar = new Navbar({ $$inline: true });

    	router = new Router({
    			props: { routes: /*routes*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tailwindcss.$$.fragment);
    			t0 = space();
    			main = element("main");
    			div1 = element("div");
    			create_component(navbar.$$.fragment);
    			t1 = space();
    			div0 = element("div");
    			create_component(router.$$.fragment);
    			attr_dev(div0, "class", "px-8 sm:px-16 pt-8 pb-8 bg-gray-50 grow min-h-screen");
    			add_location(div0, file, 24, 2, 677);
    			attr_dev(div1, "class", "flex flex-col");
    			add_location(div1, file, 22, 1, 633);
    			attr_dev(main, "class", "text-primary");
    			add_location(main, file, 21, 0, 603);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(tailwindcss, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			mount_component(navbar, div1, null);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(router, div0, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tailwindcss.$$.fragment, local);
    			transition_in(navbar.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tailwindcss.$$.fragment, local);
    			transition_out(navbar.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tailwindcss, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(navbar);
    			destroy_component(router);
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

    	const routes = {
    		'/': Showcase,
    		'/about': About,
    		'/project/:index': ProjectDescription
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router,
    		wrap: wrap$1,
    		location,
    		Tailwindcss: Tailwind,
    		Navbar,
    		Selector,
    		ProjectDescription,
    		About,
    		Showcase,
    		routes
    	});

    	return [routes];
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
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
