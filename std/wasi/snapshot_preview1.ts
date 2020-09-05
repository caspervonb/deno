import { resolve } from "../path/mod.ts";

const CLOCKID_REALTIME = 0;
const CLOCKID_MONOTONIC = 1;
const CLOCKID_PROCESS_CPUTIME_ID = 2;
const CLOCKID_THREAD_CPUTIME_ID = 3;

const ERRNO_SUCCESS = 0;
const _ERRNO_2BIG = 1;
const ERRNO_ACCES = 2;
const ERRNO_ADDRINUSE = 3;
const ERRNO_ADDRNOTAVAIL = 4;
const _ERRNO_AFNOSUPPORT = 5;
const _ERRNO_AGAIN = 6;
const _ERRNO_ALREADY = 7;
const ERRNO_BADF = 8;
const _ERRNO_BADMSG = 9;
const ERRNO_BUSY = 10;
const _ERRNO_CANCELED = 11;
const _ERRNO_CHILD = 12;
const ERRNO_CONNABORTED = 13;
const ERRNO_CONNREFUSED = 14;
const ERRNO_CONNRESET = 15;
const _ERRNO_DEADLK = 16;
const _ERRNO_DESTADDRREQ = 17;
const _ERRNO_DOM = 18;
const _ERRNO_DQUOT = 19;
const _ERRNO_EXIST = 20;
const _ERRNO_FAULT = 21;
const _ERRNO_FBIG = 22;
const _ERRNO_HOSTUNREACH = 23;
const _ERRNO_IDRM = 24;
const _ERRNO_ILSEQ = 25;
const _ERRNO_INPROGRESS = 26;
const ERRNO_INTR = 27;
const ERRNO_INVAL = 28;
const _ERRNO_IO = 29;
const _ERRNO_ISCONN = 30;
const _ERRNO_ISDIR = 31;
const _ERRNO_LOOP = 32;
const _ERRNO_MFILE = 33;
const _ERRNO_MLINK = 34;
const _ERRNO_MSGSIZE = 35;
const _ERRNO_MULTIHOP = 36;
const _ERRNO_NAMETOOLONG = 37;
const _ERRNO_NETDOWN = 38;
const _ERRNO_NETRESET = 39;
const _ERRNO_NETUNREACH = 40;
const _ERRNO_NFILE = 41;
const _ERRNO_NOBUFS = 42;
const _ERRNO_NODEV = 43;
const ERRNO_NOENT = 44;
const _ERRNO_NOEXEC = 45;
const _ERRNO_NOLCK = 46;
const _ERRNO_NOLINK = 47;
const _ERRNO_NOMEM = 48;
const _ERRNO_NOMSG = 49;
const _ERRNO_NOPROTOOPT = 50;
const _ERRNO_NOSPC = 51;
const ERRNO_NOSYS = 52;
const ERRNO_NOTCONN = 53;
const ERRNO_NOTDIR = 54;
const _ERRNO_NOTEMPTY = 55;
const _ERRNO_NOTRECOVERABLE = 56;
const _ERRNO_NOTSOCK = 57;
const _ERRNO_NOTSUP = 58;
const _ERRNO_NOTTY = 59;
const _ERRNO_NXIO = 60;
const _ERRNO_OVERFLOW = 61;
const _ERRNO_OWNERDEAD = 62;
const _ERRNO_PERM = 63;
const ERRNO_PIPE = 64;
const _ERRNO_PROTO = 65;
const _ERRNO_PROTONOSUPPORT = 66;
const _ERRNO_PROTOTYPE = 67;
const _ERRNO_RANGE = 68;
const _ERRNO_ROFS = 69;
const _ERRNO_SPIPE = 70;
const _ERRNO_SRCH = 71;
const _ERRNO_STALE = 72;
const ERRNO_TIMEDOUT = 73;
const _ERRNO_TXTBSY = 74;
const _ERRNO_XDEV = 75;
const _ERRNO_NOTCAPABLE = 76;

const RIGHTS_FD_DATASYNC = 0x0000000000000001n;
const RIGHTS_FD_READ = 0x0000000000000002n;
const _RIGHTS_FD_SEEK = 0x0000000000000004n;
const _RIGHTS_FD_FDSTAT_SET_FLAGS = 0x0000000000000008n;
const _RIGHTS_FD_SYNC = 0x0000000000000010n;
const _RIGHTS_FD_TELL = 0x0000000000000020n;
const RIGHTS_FD_WRITE = 0x0000000000000040n;
const _RIGHTS_FD_ADVISE = 0x0000000000000080n;
const RIGHTS_FD_ALLOCATE = 0x0000000000000100n;
const _RIGHTS_PATH_CREATE_DIRECTORY = 0x0000000000000200n;
const _RIGHTS_PATH_CREATE_FILE = 0x0000000000000400n;
const _RIGHTS_PATH_LINK_SOURCE = 0x0000000000000800n;
const _RIGHTS_PATH_LINK_TARGET = 0x0000000000001000n;
const _RIGHTS_PATH_OPEN = 0x0000000000002000n;
const RIGHTS_FD_READDIR = 0x0000000000004000n;
const _RIGHTS_PATH_READLINK = 0x0000000000008000n;
const _RIGHTS_PATH_RENAME_SOURCE = 0x0000000000010000n;
const _RIGHTS_PATH_RENAME_TARGET = 0x0000000000020000n;
const _RIGHTS_PATH_FILESTAT_GET = 0x0000000000040000n;
const _RIGHTS_PATH_FILESTAT_SET_SIZE = 0x0000000000080000n;
const _RIGHTS_PATH_FILESTAT_SET_TIMES = 0x0000000000100000n;
const _RIGHTS_FD_FILESTAT_GET = 0x0000000000200000n;
const RIGHTS_FD_FILESTAT_SET_SIZE = 0x0000000000400000n;
const _RIGHTS_FD_FILESTAT_SET_TIMES = 0x0000000000800000n;
const _RIGHTS_PATH_SYMLINK = 0x0000000001000000n;
const _RIGHTS_PATH_REMOVE_DIRECTORY = 0x0000000002000000n;
const _RIGHTS_PATH_UNLINK_FILE = 0x0000000004000000n;
const _RIGHTS_POLL_FD_READWRITE = 0x0000000008000000n;
const _RIGHTS_SOCK_SHUTDOWN = 0x0000000010000000n;

const _WHENCE_SET = 0;
const _WHENCE_CUR = 1;
const _WHENCE_END = 2;

const FILETYPE_UNKNOWN = 0;
const _FILETYPE_BLOCK_DEVICE = 1;
const FILETYPE_CHARACTER_DEVICE = 2;
const FILETYPE_DIRECTORY = 3;
const FILETYPE_REGULAR_FILE = 4;
const _FILETYPE_SOCKET_DGRAM = 5;
const _FILETYPE_SOCKET_STREAM = 6;
const FILETYPE_SYMBOLIC_LINK = 7;

const _ADVICE_NORMAL = 0;
const _ADVICE_SEQUENTIAL = 1;
const _ADVICE_RANDOM = 2;
const _ADVICE_WILLNEED = 3;
const _ADVICE_DONTNEED = 4;
const _ADVICE_NOREUSE = 5;

const FDFLAGS_APPEND = 0x0001;
const FDFLAGS_DSYNC = 0x0002;
const FDFLAGS_NONBLOCK = 0x0004;
const FDFLAGS_RSYNC = 0x0008;
const FDFLAGS_SYNC = 0x0010;

const _FSTFLAGS_ATIM = 0x0001;
const FSTFLAGS_ATIM_NOW = 0x0002;
const _FSTFLAGS_MTIM = 0x0004;
const FSTFLAGS_MTIM_NOW = 0x0008;

const LOOKUPFLAGS_SYMLINK_FOLLOW = 0x0001;

const OFLAGS_CREAT = 0x0001;
const OFLAGS_DIRECTORY = 0x0002;
const OFLAGS_EXCL = 0x0004;
const OFLAGS_TRUNC = 0x0008;

const _EVENTTYPE_CLOCK = 0;
const _EVENTTYPE_FD_READ = 1;
const _EVENTTYPE_FD_WRITE = 2;

const _EVENTRWFLAGS_FD_READWRITE_HANGUP = 1;
const _SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME = 1;

const _SIGNAL_NONE = 0;
const _SIGNAL_HUP = 1;
const _SIGNAL_INT = 2;
const _SIGNAL_QUIT = 3;
const _SIGNAL_ILL = 4;
const _SIGNAL_TRAP = 5;
const _SIGNAL_ABRT = 6;
const _SIGNAL_BUS = 7;
const _SIGNAL_FPE = 8;
const _SIGNAL_KILL = 9;
const _SIGNAL_USR1 = 10;
const _SIGNAL_SEGV = 11;
const _SIGNAL_USR2 = 12;
const _SIGNAL_PIPE = 13;
const _SIGNAL_ALRM = 14;
const _SIGNAL_TERM = 15;
const _SIGNAL_CHLD = 16;
const _SIGNAL_CONT = 17;
const _SIGNAL_STOP = 18;
const _SIGNAL_TSTP = 19;
const _SIGNAL_TTIN = 20;
const _SIGNAL_TTOU = 21;
const _SIGNAL_URG = 22;
const _SIGNAL_XCPU = 23;
const _SIGNAL_XFSZ = 24;
const _SIGNAL_VTALRM = 25;
const _SIGNAL_PROF = 26;
const _SIGNAL_WINCH = 27;
const _SIGNAL_POLL = 28;
const _SIGNAL_PWR = 29;
const _SIGNAL_SYS = 30;

const _RIFLAGS_RECV_PEEK = 0x0001;
const _RIFLAGS_RECV_WAITALL = 0x0002;

const _ROFLAGS_RECV_DATA_TRUNCATED = 0x0001;

const _SDFLAGS_RD = 0x0001;
const _SDFLAGS_WR = 0x0002;

const PREOPENTYPE_DIR = 0;

const clock_res_realtime = function (): bigint {
  return BigInt(1e6);
};

const clock_res_monotonic = function (): bigint {
  return BigInt(1e3);
};

const clock_res_process = clock_res_monotonic;
const clock_res_thread = clock_res_monotonic;

const clock_time_realtime = function (): bigint {
  return BigInt(Date.now()) * BigInt(1e6);
};

const clock_time_monotonic = function (): bigint {
  const t = performance.now();
  const s = Math.trunc(t);
  const ms = Math.floor((t - s) * 1e3);

  return BigInt(s) * BigInt(1e9) + BigInt(ms) * BigInt(1e6);
};

const clock_time_process = clock_time_monotonic;
const clock_time_thread = clock_time_monotonic;

function syscall<T extends CallableFunction>(target: T) {
  return function (...args: unknown[]) {
    try {
      return target(...args);
    } catch (err) {
      switch (err.name) {
        case "NotFound":
          return ERRNO_NOENT;

        case "PermissionDenied":
          return ERRNO_ACCES;

        case "ConnectionRefused":
          return ERRNO_CONNREFUSED;

        case "ConnectionReset":
          return ERRNO_CONNRESET;

        case "ConnectionAborted":
          return ERRNO_CONNABORTED;

        case "NotConnected":
          return ERRNO_NOTCONN;

        case "AddrInUse":
          return ERRNO_ADDRINUSE;

        case "AddrNotAvailable":
          return ERRNO_ADDRNOTAVAIL;

        case "BrokenPipe":
          return ERRNO_PIPE;

        case "InvalidData":
          return ERRNO_INVAL;

        case "TimedOut":
          return ERRNO_TIMEDOUT;

        case "Interrupted":
          return ERRNO_INTR;

        case "BadResource":
          return ERRNO_BADF;

        case "Busy":
          return ERRNO_BUSY;

        default:
          return ERRNO_INVAL;
      }
    }
  };
}

interface FileDescriptor {
  rid?: number;
  type?: number;
  flags?: number;
  path?: string;
  vpath?: string;
  entries?: Deno.DirEntry[];
}

export interface ContextOptions {
  args?: string[];
  env?: { [key: string]: string | undefined };
  preopens?: { [key: string]: string };
  memory?: WebAssembly.Memory;
}

export default class Context {
  args: string[];
  env: { [key: string]: string | undefined };
  memory: WebAssembly.Memory;

  fds: FileDescriptor[];

  exports: Record<string, WebAssembly.ImportValue>;

  constructor(options: ContextOptions) {
    this.args = options.args ? options.args : [];
    this.env = options.env ? options.env : {};
    this.memory = options.memory!;

    this.fds = [
      {
        rid: Deno.stdin.rid,
        type: FILETYPE_CHARACTER_DEVICE,
        flags: FDFLAGS_APPEND,
      },
      {
        rid: Deno.stdout.rid,
        type: FILETYPE_CHARACTER_DEVICE,
        flags: FDFLAGS_APPEND,
      },
      {
        rid: Deno.stderr.rid,
        type: FILETYPE_CHARACTER_DEVICE,
        flags: FDFLAGS_APPEND,
      },
    ];

    if (options.preopens) {
      for (const [vpath, path] of Object.entries(options.preopens)) {
        const type = FILETYPE_DIRECTORY;
        const entries = Array.from(Deno.readDirSync(path));

        const entry = {
          type,
          entries,
          path,
          vpath,
        };

        this.fds.push(entry);
      }
    }

    this.exports = {
      args_get: syscall((
        argv_ptr: number,
        argv_buf_ptr: number,
      ): number => {
        const args = this.args;
        const text = new TextEncoder();
        const heap = new Uint8Array(this.memory.buffer);
        const view = new DataView(this.memory.buffer);

        for (const arg of args) {
          view.setUint32(argv_ptr, argv_buf_ptr, true);
          argv_ptr += 4;

          const data = text.encode(`${arg}\0`);
          heap.set(data, argv_buf_ptr);
          argv_buf_ptr += data.length;
        }

        return ERRNO_SUCCESS;
      }),

      args_sizes_get: syscall((
        argc_out: number,
        argv_buf_size_out: number,
      ): number => {
        const args = this.args;
        const text = new TextEncoder();
        const view = new DataView(this.memory.buffer);

        view.setUint32(argc_out, args.length, true);
        view.setUint32(
          argv_buf_size_out,
          args.reduce(function (acc, arg) {
            return acc + text.encode(`${arg}\0`).length;
          }, 0),
          true,
        );

        return ERRNO_SUCCESS;
      }),

      environ_get: syscall((
        environ_ptr: number,
        environ_buf_ptr: number,
      ): number => {
        const entries = Object.entries(this.env);
        const text = new TextEncoder();
        const heap = new Uint8Array(this.memory.buffer);
        const view = new DataView(this.memory.buffer);

        for (const [key, value] of entries) {
          view.setUint32(environ_ptr, environ_buf_ptr, true);
          environ_ptr += 4;

          const data = text.encode(`${key}=${value}\0`);
          heap.set(data, environ_buf_ptr);
          environ_buf_ptr += data.length;
        }

        return ERRNO_SUCCESS;
      }),

      environ_sizes_get: syscall((
        environc_out: number,
        environ_buf_size_out: number,
      ): number => {
        const entries = Object.entries(this.env);
        const text = new TextEncoder();
        const view = new DataView(this.memory.buffer);

        view.setUint32(environc_out, entries.length, true);
        view.setUint32(
          environ_buf_size_out,
          entries.reduce(function (acc, [key, value]) {
            return acc + text.encode(`${key}=${value}\0`).length;
          }, 0),
          true,
        );

        return ERRNO_SUCCESS;
      }),

      clock_res_get: syscall((
        id: number,
        resolution_out: number,
      ): number => {
        const view = new DataView(this.memory.buffer);

        switch (id) {
          case CLOCKID_REALTIME:
            view.setBigUint64(resolution_out, clock_res_realtime(), true);
            break;

          case CLOCKID_MONOTONIC:
            view.setBigUint64(resolution_out, clock_res_monotonic(), true);
            break;

          case CLOCKID_PROCESS_CPUTIME_ID:
            view.setBigUint64(resolution_out, clock_res_process(), true);
            break;

          case CLOCKID_THREAD_CPUTIME_ID:
            view.setBigUint64(resolution_out, clock_res_thread(), true);
            break;

          default:
            return ERRNO_INVAL;
        }

        return ERRNO_SUCCESS;
      }),

      clock_time_get: syscall((
        id: number,
        precision: bigint,
        time_out: number,
      ): number => {
        const view = new DataView(this.memory.buffer);

        switch (id) {
          case CLOCKID_REALTIME:
            view.setBigUint64(time_out, clock_time_realtime(), true);
            break;

          case CLOCKID_MONOTONIC:
            view.setBigUint64(time_out, clock_time_monotonic(), true);
            break;

          case CLOCKID_PROCESS_CPUTIME_ID:
            view.setBigUint64(time_out, clock_time_process(), true);
            break;

          case CLOCKID_THREAD_CPUTIME_ID:
            view.setBigUint64(time_out, clock_time_thread(), true);
            break;

          default:
            return ERRNO_INVAL;
        }

        return ERRNO_SUCCESS;
      }),

      fd_advise: syscall((
        _fd: number,
        _offset: bigint,
        _len: bigint,
        _advice: number,
      ): number => {
        return ERRNO_NOSYS;
      }),

      fd_allocate: syscall((
        _fd: number,
        _offset: bigint,
        _len: bigint,
      ): number => {
        return ERRNO_NOSYS;
      }),

      fd_close: syscall((
        fd: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (entry.rid) {
          Deno.close(entry.rid);
        }

        delete this.fds[fd];

        return ERRNO_SUCCESS;
      }),

      fd_datasync: syscall((
        fd: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        Deno.fdatasyncSync(entry.rid!);

        return ERRNO_SUCCESS;
      }),

      fd_fdstat_get: syscall((
        fd: number,
        stat_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        const view = new DataView(this.memory.buffer);
        view.setUint8(stat_out, entry.type!);
        view.setUint16(stat_out + 2, entry.flags!, true);
        view.setBigUint64(stat_out + 8, 0n, true); // TODO
        view.setBigUint64(stat_out + 16, 0n, true); // TODO

        return ERRNO_SUCCESS;
      }),

      fd_fdstat_set_flags: syscall((
        _fd: number,
        _flags: number,
      ): number => {
        return ERRNO_NOSYS;
      }),

      fd_fdstat_set_rights: syscall((
        _fd: number,
        _fs_rights_base: bigint,
        _fs_rights_inheriting: bigint,
      ): number => {
        return ERRNO_NOSYS;
      }),

      fd_filestat_get: syscall((
        fd: number,
        buf_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        const view = new DataView(this.memory.buffer);

        const info = Deno.fstatSync(entry.rid!);

        if (entry.type === undefined) {
          switch (true) {
            case info.isFile:
              entry.type = FILETYPE_REGULAR_FILE;
              break;

            case info.isDirectory:
              entry.type = FILETYPE_DIRECTORY;
              break;

            case info.isSymlink:
              entry.type = FILETYPE_SYMBOLIC_LINK;
              break;

            default:
              entry.type = FILETYPE_UNKNOWN;
              break;
          }
        }

        view.setBigUint64(buf_out, BigInt(info.dev ? info.dev : 0), true);
        buf_out += 8;

        view.setBigUint64(buf_out, BigInt(info.ino ? info.ino : 0), true);
        buf_out += 8;

        view.setUint8(buf_out, entry.type);
        buf_out += 8;

        view.setUint32(buf_out, Number(info.nlink), true);
        buf_out += 8;

        view.setBigUint64(buf_out, BigInt(info.size), true);
        buf_out += 8;

        view.setBigUint64(
          buf_out,
          BigInt(info.atime ? info.atime.getTime() * 1e6 : 0),
          true,
        );
        buf_out += 8;

        view.setBigUint64(
          buf_out,
          BigInt(info.mtime ? info.mtime.getTime() * 1e6 : 0),
          true,
        );
        buf_out += 8;

        view.setBigUint64(
          buf_out,
          BigInt(info.birthtime ? info.birthtime.getTime() * 1e6 : 0),
          true,
        );
        buf_out += 8;

        return ERRNO_SUCCESS;
      }),

      fd_filestat_set_size: syscall((
        fd: number,
        size: bigint,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        Deno.ftruncateSync(entry.rid!, Number(size));

        return ERRNO_SUCCESS;
      }),

      fd_filestat_set_times: syscall((
        fd: number,
        atim: bigint,
        mtim: bigint,
        fst_flags: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.path) {
          return ERRNO_INVAL;
        }

        if ((fst_flags & FSTFLAGS_ATIM_NOW) == FSTFLAGS_ATIM_NOW) {
          atim = BigInt(Date.now() * 1e6);
        }

        if ((fst_flags & FSTFLAGS_MTIM_NOW) == FSTFLAGS_MTIM_NOW) {
          mtim = BigInt(Date.now() * 1e6);
        }

        Deno.utimeSync(entry.path!, Number(atim), Number(mtim));

        return ERRNO_SUCCESS;
      }),

      fd_pread: syscall((
        fd: number,
        iovs_ptr: number,
        iovs_len: number,
        offset: bigint,
        nread_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (entry == null) {
          return ERRNO_BADF;
        }

        const seek = Deno.seekSync(entry.rid!, 0, Deno.SeekMode.Current);
        const view = new DataView(this.memory.buffer);

        let nread = 0;
        for (let i = 0; i < iovs_len; i++) {
          const data_ptr = view.getUint32(iovs_ptr, true);
          iovs_ptr += 4;

          const data_len = view.getUint32(iovs_ptr, true);
          iovs_ptr += 4;

          const data = new Uint8Array(this.memory.buffer, data_ptr, data_len);
          nread += Deno.readSync(entry.rid!, data) as number;
        }

        Deno.seekSync(entry.rid!, seek, Deno.SeekMode.Start);
        view.setUint32(nread_out, nread, true);

        return ERRNO_SUCCESS;
      }),

      fd_prestat_get: syscall((
        fd: number,
        buf_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.vpath) {
          return ERRNO_BADF;
        }

        const view = new DataView(this.memory.buffer);
        view.setUint8(buf_out, PREOPENTYPE_DIR);
        view.setUint32(
          buf_out + 4,
          new TextEncoder().encode(entry.vpath).byteLength,
          true,
        );

        return ERRNO_SUCCESS;
      }),

      fd_prestat_dir_name: syscall((
        fd: number,
        path_ptr: number,
        path_len: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.vpath) {
          return ERRNO_BADF;
        }

        const data = new Uint8Array(this.memory.buffer, path_ptr, path_len);
        data.set(new TextEncoder().encode(entry.vpath));

        return ERRNO_SUCCESS;
      }),

      fd_pwrite: syscall((
        fd: number,
        iovs_ptr: number,
        iovs_len: number,
        offset: bigint,
        nwritten_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        const seek = Deno.seekSync(entry.rid!, 0, Deno.SeekMode.Current);
        const view = new DataView(this.memory.buffer);

        let nwritten = 0;
        for (let i = 0; i < iovs_len; i++) {
          const data_ptr = view.getUint32(iovs_ptr, true);
          iovs_ptr += 4;

          const data_len = view.getUint32(iovs_ptr, true);
          iovs_ptr += 4;

          const data = new Uint8Array(this.memory.buffer, data_ptr, data_len);
          nwritten += Deno.writeSync(entry.rid!, data) as number;
        }

        Deno.seekSync(entry.rid!, seek, Deno.SeekMode.Start);
        view.setUint32(nwritten_out, nwritten, true);

        return ERRNO_SUCCESS;
      }),

      fd_read: syscall((
        fd: number,
        iovs_ptr: number,
        iovs_len: number,
        nread_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        const view = new DataView(this.memory.buffer);

        let nread = 0;
        for (let i = 0; i < iovs_len; i++) {
          const data_ptr = view.getUint32(iovs_ptr, true);
          iovs_ptr += 4;

          const data_len = view.getUint32(iovs_ptr, true);
          iovs_ptr += 4;

          const data = new Uint8Array(this.memory.buffer, data_ptr, data_len);
          nread += Deno.readSync(entry.rid!, data) as number;
        }

        view.setUint32(nread_out, nread, true);

        return ERRNO_SUCCESS;
      }),

      fd_readdir: syscall((
        fd: number,
        buf_ptr: number,
        buf_len: number,
        cookie: bigint,
        bufused_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        const heap = new Uint8Array(this.memory.buffer);
        const view = new DataView(this.memory.buffer);

        let bufused = 0;

        const entries = Array.from(Deno.readDirSync(entry.path!));
        for (let i = Number(cookie); i < entries.length; i++) {
          const name_data = new TextEncoder().encode(entries[i].name);

          const entry_info = Deno.statSync(
            resolve(entry.path!, entries[i].name),
          );
          const entry_data = new Uint8Array(24 + name_data.byteLength);
          const entry_view = new DataView(entry_data.buffer);

          entry_view.setBigUint64(0, BigInt(i + 1), true);
          entry_view.setBigUint64(
            8,
            BigInt(entry_info.ino ? entry_info.ino : 0),
            true,
          );
          entry_view.setUint32(16, name_data.byteLength, true);

          let type: number;
          switch (true) {
            case entries[i].isFile:
              type = FILETYPE_REGULAR_FILE;
              break;

            case entries[i].isDirectory:
              type = FILETYPE_REGULAR_FILE;
              break;

            case entries[i].isSymlink:
              type = FILETYPE_SYMBOLIC_LINK;
              break;

            default:
              type = FILETYPE_REGULAR_FILE;
              break;
          }

          entry_view.setUint8(20, type);
          entry_data.set(name_data, 24);

          const data = entry_data.slice(
            0,
            Math.min(entry_data.length, buf_len - bufused),
          );
          heap.set(data, buf_ptr + bufused);
          bufused += data.byteLength;
        }

        view.setUint32(bufused_out, bufused, true);

        return ERRNO_SUCCESS;
      }),

      fd_renumber: syscall((
        fd: number,
        to: number,
      ): number => {
        if (!this.fds[fd]) {
          return ERRNO_BADF;
        }

        if (!this.fds[to]) {
          return ERRNO_BADF;
        }

        if (this.fds[to].rid) {
          Deno.close(this.fds[to].rid!);
        }

        this.fds[to] = this.fds[fd];
        delete this.fds[fd];

        return ERRNO_SUCCESS;
      }),

      fd_seek: syscall((
        fd: number,
        offset: bigint,
        whence: number,
        newoffset_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        const view = new DataView(this.memory.buffer);

        // FIXME Deno does not support seeking with big integers
        const newoffset = Deno.seekSync(entry.rid!, Number(offset), whence);
        view.setBigUint64(newoffset_out, BigInt(newoffset), true);

        return ERRNO_SUCCESS;
      }),

      fd_sync: syscall((
        fd: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        Deno.fsyncSync(entry.rid!);

        return ERRNO_SUCCESS;
      }),

      fd_tell: syscall((
        fd: number,
        offset_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        const view = new DataView(this.memory.buffer);

        const offset = Deno.seekSync(entry.rid!, 0, Deno.SeekMode.Current);
        view.setBigUint64(offset_out, BigInt(offset), true);

        return ERRNO_SUCCESS;
      }),

      fd_write: syscall((
        fd: number,
        iovs_ptr: number,
        iovs_len: number,
        nwritten_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        const view = new DataView(this.memory.buffer);

        let nwritten = 0;
        for (let i = 0; i < iovs_len; i++) {
          const data_ptr = view.getUint32(iovs_ptr, true);
          iovs_ptr += 4;

          const data_len = view.getUint32(iovs_ptr, true);
          iovs_ptr += 4;

          const data = new Uint8Array(this.memory.buffer, data_ptr, data_len);
          nwritten += Deno.writeSync(entry.rid!, data) as number;
        }

        view.setUint32(nwritten_out, nwritten, true);

        return ERRNO_SUCCESS;
      }),

      path_create_directory: syscall((
        fd: number,
        path_ptr: number,
        path_len: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.path) {
          return ERRNO_INVAL;
        }

        const text = new TextDecoder();
        const data = new Uint8Array(this.memory.buffer, path_ptr, path_len);
        const path = resolve(entry.path!, text.decode(data));

        Deno.mkdirSync(path);

        return ERRNO_SUCCESS;
      }),

      path_filestat_get: syscall((
        fd: number,
        flags: number,
        path_ptr: number,
        path_len: number,
        buf_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.path) {
          return ERRNO_INVAL;
        }

        const text = new TextDecoder();
        const data = new Uint8Array(this.memory.buffer, path_ptr, path_len);
        const path = resolve(entry.path!, text.decode(data));

        const view = new DataView(this.memory.buffer);

        const info = (flags & LOOKUPFLAGS_SYMLINK_FOLLOW) != 0
          ? Deno.statSync(path)
          : Deno.lstatSync(path);

        view.setBigUint64(buf_out, BigInt(info.dev ? info.dev : 0), true);
        buf_out += 8;

        view.setBigUint64(buf_out, BigInt(info.ino ? info.ino : 0), true);
        buf_out += 8;

        switch (true) {
          case info.isFile:
            view.setUint8(buf_out, FILETYPE_REGULAR_FILE);
            buf_out += 8;
            break;

          case info.isDirectory:
            view.setUint8(buf_out, FILETYPE_DIRECTORY);
            buf_out += 8;
            break;

          case info.isSymlink:
            view.setUint8(buf_out, FILETYPE_SYMBOLIC_LINK);
            buf_out += 8;
            break;

          default:
            view.setUint8(buf_out, FILETYPE_UNKNOWN);
            buf_out += 8;
            break;
        }

        view.setUint32(buf_out, Number(info.nlink), true);
        buf_out += 8;

        view.setBigUint64(buf_out, BigInt(info.size), true);
        buf_out += 8;

        view.setBigUint64(
          buf_out,
          BigInt(info.atime ? info.atime.getTime() * 1e6 : 0),
          true,
        );
        buf_out += 8;

        view.setBigUint64(
          buf_out,
          BigInt(info.mtime ? info.mtime.getTime() * 1e6 : 0),
          true,
        );
        buf_out += 8;

        view.setBigUint64(
          buf_out,
          BigInt(info.birthtime ? info.birthtime.getTime() * 1e6 : 0),
          true,
        );
        buf_out += 8;

        return ERRNO_SUCCESS;
      }),

      path_filestat_set_times: syscall((
        fd: number,
        flags: number,
        path_ptr: number,
        path_len: number,
        atim: bigint,
        mtim: bigint,
        fst_flags: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.path) {
          return ERRNO_INVAL;
        }

        const text = new TextDecoder();
        const data = new Uint8Array(this.memory.buffer, path_ptr, path_len);
        const path = resolve(entry.path!, text.decode(data));

        if ((fst_flags & FSTFLAGS_ATIM_NOW) == FSTFLAGS_ATIM_NOW) {
          atim = BigInt(Date.now()) * BigInt(1e6);
        }

        if ((fst_flags & FSTFLAGS_MTIM_NOW) == FSTFLAGS_MTIM_NOW) {
          mtim = BigInt(Date.now()) * BigInt(1e6);
        }

        Deno.utimeSync(path, Number(atim), Number(mtim));

        return ERRNO_SUCCESS;
      }),

      path_link: syscall((
        old_fd: number,
        old_flags: number,
        old_path_ptr: number,
        old_path_len: number,
        new_fd: number,
        new_path_ptr: number,
        new_path_len: number,
      ): number => {
        const old_entry = this.fds[old_fd];
        const new_entry = this.fds[new_fd];
        if (!old_entry || !new_entry) {
          return ERRNO_BADF;
        }

        if (!old_entry.path || !new_entry.path) {
          return ERRNO_INVAL;
        }

        const text = new TextDecoder();
        const old_data = new Uint8Array(
          this.memory.buffer,
          old_path_ptr,
          old_path_len,
        );
        const old_path = resolve(old_entry.path!, text.decode(old_data));
        const new_data = new Uint8Array(
          this.memory.buffer,
          new_path_ptr,
          new_path_len,
        );
        const new_path = resolve(new_entry.path!, text.decode(new_data));

        Deno.linkSync(old_path, new_path);

        return ERRNO_SUCCESS;
      }),

      path_open: syscall((
        fd: number,
        dirflags: number,
        path_ptr: number,
        path_len: number,
        oflags: number,
        fs_rights_base: bigint,
        fs_rights_inherting: bigint,
        fdflags: number,
        opened_fd_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.path) {
          return ERRNO_INVAL;
        }

        const text = new TextDecoder();
        const data = new Uint8Array(this.memory.buffer, path_ptr, path_len);
        const path = resolve(entry.path!, text.decode(data));

        if ((oflags & OFLAGS_DIRECTORY) !== 0) {
          // XXX (caspervonb) this isn't ideal as we can't get a rid for the
          // directory this way so there's no native fstat but Deno.open
          // doesn't work with directories on windows so we'll have to work
          // around it for now.
          const entries = Array.from(Deno.readDirSync(path));
          const opened_fd = this.fds.push({
            flags: fdflags,
            path,
            entries,
          }) - 1;

          const view = new DataView(this.memory.buffer);
          view.setUint32(opened_fd_out, opened_fd, true);

          return ERRNO_SUCCESS;
        }

        const options = {
          read: false,
          write: false,
          append: false,
          truncate: false,
          create: false,
          createNew: false,
        };

        if ((oflags & OFLAGS_CREAT) !== 0) {
          options.create = true;
          options.write = true;
        }

        if ((oflags & OFLAGS_EXCL) !== 0) {
          options.createNew = true;
        }

        if ((oflags & OFLAGS_TRUNC) !== 0) {
          options.truncate = true;
          options.write = true;
        }

        const read = (
          RIGHTS_FD_READ |
          RIGHTS_FD_READDIR
        );

        if ((fs_rights_base & read) != 0n) {
          options.read = true;
        }

        const write = (
          RIGHTS_FD_DATASYNC |
          RIGHTS_FD_WRITE |
          RIGHTS_FD_ALLOCATE |
          RIGHTS_FD_FILESTAT_SET_SIZE
        );

        if ((fs_rights_base & write) != 0n) {
          options.write = true;
        }

        if ((fdflags & FDFLAGS_APPEND) != 0) {
          options.append = true;
        }

        if ((fdflags & FDFLAGS_DSYNC) != 0) {
          // TODO (caspervonb) review if we can emulate this.
        }

        if ((fdflags & FDFLAGS_NONBLOCK) != 0) {
          // TODO (caspervonb) review if we can emulate this.
        }

        if ((fdflags & FDFLAGS_RSYNC) != 0) {
          // TODO (caspervonb) review if we can emulate this.
        }

        if ((fdflags & FDFLAGS_SYNC) != 0) {
          // TODO (caspervonb) review if we can emulate this.
        }

        if (!options.read && !options.write && !options.truncate) {
          options.read = true;
        }

        const { rid } = Deno.openSync(path, options);
        const opened_fd = this.fds.push({
          rid,
          flags: fdflags,
          path,
        }) - 1;

        const view = new DataView(this.memory.buffer);
        view.setUint32(opened_fd_out, opened_fd, true);

        return ERRNO_SUCCESS;
      }),

      path_readlink: syscall((
        fd: number,
        path_ptr: number,
        path_len: number,
        buf_ptr: number,
        buf_len: number,
        bufused_out: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.path) {
          return ERRNO_INVAL;
        }

        const view = new DataView(this.memory.buffer);
        const heap = new Uint8Array(this.memory.buffer);

        const path_data = new Uint8Array(
          this.memory.buffer,
          path_ptr,
          path_len,
        );
        const path = resolve(entry.path!, new TextDecoder().decode(path_data));

        const link = Deno.readLinkSync(path);
        const link_data = new TextEncoder().encode(link);
        heap.set(new Uint8Array(link_data, 0, buf_len), buf_ptr);

        const bufused = Math.min(link_data.byteLength, buf_len);
        view.setUint32(bufused_out, bufused, true);

        return ERRNO_SUCCESS;
      }),

      path_remove_directory: syscall((
        fd: number,
        path_ptr: number,
        path_len: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.path) {
          return ERRNO_INVAL;
        }

        const text = new TextDecoder();
        const data = new Uint8Array(this.memory.buffer, path_ptr, path_len);
        const path = resolve(entry.path!, text.decode(data));

        if (!Deno.statSync(path).isDirectory) {
          return ERRNO_NOTDIR;
        }

        Deno.removeSync(path);

        return ERRNO_SUCCESS;
      }),

      path_rename: syscall((
        fd: number,
        old_path_ptr: number,
        old_path_len: number,
        new_fd: number,
        new_path_ptr: number,
        new_path_len: number,
      ): number => {
        const old_entry = this.fds[fd];
        const new_entry = this.fds[new_fd];
        if (!old_entry || !new_entry) {
          return ERRNO_BADF;
        }

        if (!old_entry.path || !new_entry.path) {
          return ERRNO_INVAL;
        }

        const text = new TextDecoder();
        const old_data = new Uint8Array(
          this.memory.buffer,
          old_path_ptr,
          old_path_len,
        );
        const old_path = resolve(old_entry.path!, text.decode(old_data));
        const new_data = new Uint8Array(
          this.memory.buffer,
          new_path_ptr,
          new_path_len,
        );
        const new_path = resolve(new_entry.path!, text.decode(new_data));

        Deno.renameSync(old_path, new_path);

        return ERRNO_SUCCESS;
      }),

      path_symlink: syscall((
        old_path_ptr: number,
        old_path_len: number,
        fd: number,
        new_path_ptr: number,
        new_path_len: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.path) {
          return ERRNO_INVAL;
        }

        const text = new TextDecoder();
        const old_data = new Uint8Array(
          this.memory.buffer,
          old_path_ptr,
          old_path_len,
        );
        const old_path = text.decode(old_data);
        const new_data = new Uint8Array(
          this.memory.buffer,
          new_path_ptr,
          new_path_len,
        );
        const new_path = resolve(entry.path!, text.decode(new_data));

        Deno.symlinkSync(old_path, new_path);

        return ERRNO_SUCCESS;
      }),

      path_unlink_file: syscall((
        fd: number,
        path_ptr: number,
        path_len: number,
      ): number => {
        const entry = this.fds[fd];
        if (!entry) {
          return ERRNO_BADF;
        }

        if (!entry.path) {
          return ERRNO_INVAL;
        }

        const text = new TextDecoder();
        const data = new Uint8Array(this.memory.buffer, path_ptr, path_len);
        const path = resolve(entry.path!, text.decode(data));

        Deno.removeSync(path);

        return ERRNO_SUCCESS;
      }),

      poll_oneoff: syscall((
        _in_ptr: number,
        _out_ptr: number,
        _nsubscriptions: number,
        _nevents_out: number,
      ): number => {
        return ERRNO_NOSYS;
      }),

      proc_exit: syscall((
        rval: number,
      ): never => {
        Deno.exit(rval);
      }),

      proc_raise: syscall((
        _sig: number,
      ): number => {
        return ERRNO_NOSYS;
      }),

      sched_yield: syscall((): number => {
        return ERRNO_SUCCESS;
      }),

      random_get: syscall((
        buf_ptr: number,
        buf_len: number,
      ): number => {
        const buffer = new Uint8Array(this.memory.buffer, buf_ptr, buf_len);
        crypto.getRandomValues(buffer);

        return ERRNO_SUCCESS;
      }),

      sock_recv: syscall((
        _fd: number,
        _ri_data_ptr: number,
        _ri_data_len: number,
        _ri_flags: number,
        _ro_datalen_out: number,
        _ro_flags_out: number,
      ): number => {
        return ERRNO_NOSYS;
      }),

      sock_send: syscall((
        _fd: number,
        _si_data_ptr: number,
        _si_data_len: number,
        _si_flags: number,
        _so_datalen_out: number,
      ): number => {
        return ERRNO_NOSYS;
      }),

      sock_shutdown: syscall((
        _fd: number,
        _how: number,
      ): number => {
        return ERRNO_NOSYS;
      }),
    };
  }
}
